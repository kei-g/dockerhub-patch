import { DockerHub, Minimum } from '..'
import { EventEmitter } from 'events'
import { IncomingHttpHeaders } from 'http'
import { RequestOptions } from 'https'

type ResponseCallback = (res: Minimum.HttpResponse) => void

export class PseudoDockerhub implements Minimum.HttpModule {
  request(url: string, opts: RequestOptions, cb: ResponseCallback): Minimum.HttpRequest {
    return new Request(url, opts, cb)
  }
}

type MaybeCallback = () => void | undefined

class Request implements Minimum.HttpRequest {
  private readonly eventEmitter = new EventEmitter()

  private readonly url: URL

  constructor(url: string, opts: RequestOptions, cb: ResponseCallback) {
    this.eventEmitter.once(
      '--emit-response',
      (eventEmitter: EventEmitter, chunk: unknown) => {
        let response = undefined as unknown as Minimum.HttpResponse
        if (this.url.pathname === '/v2/empty')
          response = new EmptyResponse(chunk, eventEmitter)
        else if (this.url.pathname.startsWith('/v2/error/'))
          response = new ErrorResponse(chunk, eventEmitter, this.url.pathname.slice(10))
        else if (this.url.pathname === '/v2/users/login')
          response = new LoginResponse(chunk, eventEmitter)
        else if (opts.method === 'PATCH')
          response = new PatchResponse(
            chunk,
            this.url.pathname.split('/').slice(3).join('/'),
            eventEmitter
          )
        else if (this.url.pathname.startsWith('/v2/repositories/'))
          response = new ImageResponse(chunk, eventEmitter)
        else if (this.url.pathname.startsWith('/v2/namespaces/'))
          response = new ImageSummaryResponse(chunk, eventEmitter)
        eventEmitter.emit('response', response)
        cb(response)
      }
    )
    this.url = new URL(url)
  }

  end(cb: MaybeCallback): Request {
    queueMicrotask(() => this.eventEmitter.emit('--emit-response', this.eventEmitter, '{}'))
    queueMicrotask(() => this.eventEmitter.emit('--end', cb))
    return this
  }

  get host(): string {
    return this.url.host
  }

  on(event: 'error', handler: (err: Error) => void): Request
  on(event: 'response', handler: (res: Minimum.HttpResponse) => void): Request
  on(event: unknown, handler: unknown): Request {
    this.eventEmitter.on(event as string, handler as (...args: unknown[]) => void)
    return this
  }

  setHeader(_name: string, _value: string | number | readonly string[]): Request {
    return this
  }

  write(chunk: unknown): boolean {
    queueMicrotask(
      () => this.eventEmitter.emit('--emit-response', this.eventEmitter, chunk)
    )
    return true
  }
}

abstract class Response<T> implements Minimum.HttpResponse {
  protected readonly eventEmitter = new EventEmitter()

  constructor(chunk: unknown, request: EventEmitter) {
    chunk instanceof Promise
      ? chunk.then(
        (value: unknown) => this.eventEmitter.emit('error', value)
      )
      : request.on(
        '--end',
        (cb: MaybeCallback) => this.eventEmitter.emit(
          '--request-end',
          JSON.parse(chunk as string) as T,
          cb
        )
      )
  }

  get headers(): IncomingHttpHeaders {
    return {
      'content-type': 'application/json',
    }
  }

  on(event: 'data', handler: (data: Buffer) => void): Minimum.HttpResponse
  on(event: 'end', handler: () => void): Minimum.HttpResponse
  on(event: 'error', handler: (err: Error) => void): Minimum.HttpResponse
  on(event: unknown, handler: unknown): Minimum.HttpResponse {
    this.eventEmitter.on(
      event as string,
      handler as (...args: unknown[]) => void
    )
    return this
  }
}

class EmptyResponse extends Response<Record<string, unknown>> {
  constructor(chunk: unknown, request: EventEmitter) {
    super(chunk, request)
    this.eventEmitter.on(
      '--request-end',
      (_: Record<string, unknown>, cb: MaybeCallback) => {
        this.eventEmitter.emit('end')
        if (cb)
          cb()
      }
    )
  }
}

class ErrorResponse extends Response<Record<string, unknown>> {
  constructor(chunk: unknown, request: EventEmitter, when: string) {
    super(chunk, request)
    queueMicrotask(
      () => {
        switch (when) {
          case 'request':
            request.emit('error', new Error())
            break
          case 'response':
            this.eventEmitter.emit('error', new Error())
            break
        }
      }
    )
  }
}

class ImageResponse extends Response<Record<string, unknown>> {
  constructor(chunk: unknown, request: EventEmitter) {
    super(chunk, request)
    this.eventEmitter.on(
      '--request-end',
      (_: Record<string, unknown>, cb: MaybeCallback) => {
        const json = JSON.stringify(
          {
            hub_user: 'snowstep',
            name: 'apt-fast',
            namespace: 'snowstep',
            user: 'snowstep',
          }
        )
        const buf1 = Buffer.from(json.slice(0, json.length / 2))
        const buf2 = Buffer.from(json.slice(json.length / 2))
        this.eventEmitter.emit('data', buf1)
        this.eventEmitter.emit('data', buf2)
        this.eventEmitter.emit('end')
        if (cb)
          cb()
      }
    )
  }
}

class ImageSummaryResponse extends Response<Record<string, unknown>> {
  constructor(chunk: unknown, request: EventEmitter) {
    super(chunk, request)
    this.eventEmitter.on(
      '--request-end',
      (_: Record<string, unknown>, cb: MaybeCallback) => {
        this.eventEmitter.emit('data', Buffer.from(JSON.stringify(
          {
            message: 'this is a message'
          }
        )))
        this.eventEmitter.emit('end')
        if (cb)
          cb()
      }
    )
  }
}

class LoginResponse extends Response<DockerHub.LoginParameters> {
  constructor(chunk: unknown, request: EventEmitter) {
    super(chunk, request)
    this.eventEmitter.on(
      '--request-end',
      (req: DockerHub.LoginParameters, cb: MaybeCallback) => {
        const failure = req.username === 'invalidtestuser'
          && req.password === 'nopassword'
        const response = failure
          ? { detail: 'Incorrect authentication credentials' }
          : { token: 'foobar' }
        const data = Buffer.from(JSON.stringify(response))
        this.eventEmitter.emit('data', data)
        this.eventEmitter.emit('end')
        if (cb)
          cb()
      }
    )
  }

  get headers(): IncomingHttpHeaders {
    const expires = new Date(Date.now() + 1)
    return {
      'content-type': 'application/json',
      'set-cookie': [
        `Domain=hub.docker.com; Expires=${expires.toISOString()}; HttpOnly; Path=/v2/; foo=bar`,
        `Domain=hub.docker.com; Expires=${expires.toISOString()}; Path=/v2/; Secure; foo=bar`,
      ],
    }
  }
}

class PatchResponse extends Response<DockerHub.Description> {
  constructor(chunk: unknown, private readonly repository: string, request: EventEmitter) {
    super(chunk, request)
    this.eventEmitter.on(
      '--request-end',
      (req: DockerHub.Description, cb: MaybeCallback) => {
        this.eventEmitter.emit('data', Buffer.from(JSON.stringify(
          {
            message: `${req.overview} has been set to ${req.repo}`
          }
        )))
        this.eventEmitter.emit('end')
        if (cb)
          cb()
      }
    )
  }
}
