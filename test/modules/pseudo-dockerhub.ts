import { Action0, DockerHub, Func, MaybeCallback, Minimum, ResponseCallback } from '..'
import { EventEmitter } from 'events'
import { IncomingHttpHeaders } from 'http'
import { RequestOptions } from 'https'
import { isPromise } from 'util/types'

export class PseudoDockerhub implements Minimum.HttpModule {
  request(url: string, opts: RequestOptions, cb: ResponseCallback): Minimum.HttpRequest {
    return new Request(url, opts, cb)
  }
}

class Request implements Minimum.HttpRequest {
  #handleEmitResponse(cb: ResponseCallback, opts: RequestOptions, eventEmitter: EventEmitter, chunk: unknown) {
    const handlers = [
      { ctor: EmptyResponse, regex: /^\/v2\/empty$/, selector: this.#returnEmptyString(), },
      { ctor: ErrorResponse, regex: /^\/v2\/error\//, selector: this.#sliceString(3), },
      { ctor: LoginResponse, regex: /^\/v2\/users\/login$/, selector: this.#returnEmptyString(), },
      { ctor: PatchResponse, method: 'PATCH', selector: this.#sliceString(3), },
      { ctor: ImageResponse, regex: /^\/v2\/repositories\//, selector: this.#returnEmptyString(), },
      { ctor: ImageSummaryResponse, regex: /^\/v2\/namespaces\//, selector: this.#returnEmptyString(), },
    ] as const
    const handler = handlers.find(this.#testHandler.bind(this, opts))
    if (handler) {
      const response = new handler.ctor(chunk, eventEmitter, handler.selector(this.url.pathname))
      eventEmitter.emit('response', response)
      cb(response)
    }
  }

  #returnEmptyString() {
    return (_: string) => ''
  }

  #sliceString(count: number) {
    return (pathname: string) => pathname.split('/').slice(count).join('/')
  }

  #testHandler(opts: RequestOptions, handler: { method: string } | { regex: RegExp }) {
    return 'regex' in handler ? handler.regex.test(this.url.pathname) : handler.method === opts.method
  }

  private readonly eventEmitter = new EventEmitter()

  private readonly url: URL

  constructor(url: string, opts: RequestOptions, cb: ResponseCallback) {
    this.eventEmitter.once('--emit-response', this.#handleEmitResponse.bind(this, cb, opts))
    this.url = new URL(url)
  }

  end(cb: MaybeCallback): Request {
    queueMicrotask(this.eventEmitter.emit.bind(this.eventEmitter, '--emit-response', this.eventEmitter, '{}'))
    queueMicrotask(this.eventEmitter.emit.bind(this.eventEmitter, '--end', cb))
    return this
  }

  get host(): string {
    return this.url.host
  }

  on(event: 'error', handler: Func<Error>): Request
  on(event: 'response', handler: Func<Minimum.HttpResponse>): Request
  on(event: 'error' | 'response', handler: Func<Error> | Func<Minimum.HttpResponse>): Request {
    this.eventEmitter.on(event, handler)
    return this
  }

  setHeader(_name: string, _value: string | number | readonly string[]): Request {
    return this
  }

  write(chunk: unknown): boolean {
    queueMicrotask(this.eventEmitter.emit.bind(this.eventEmitter, '--emit-response', this.eventEmitter, chunk))
    return true
  }
}

abstract class Response<T> implements Minimum.HttpResponse {
  protected readonly eventEmitter = new EventEmitter()

  protected respond(cb: MaybeCallback, response: object) {
    this.eventEmitter.emit('data', Buffer.from(JSON.stringify(response)))
    this.eventEmitter.emit('end')
    if (cb)
      cb()
  }

  constructor(chunk: unknown, request: EventEmitter) {
    if (isPromise(chunk))
      chunk.then(this.eventEmitter.emit.bind(this.eventEmitter, 'error'))
    else
      request.on('--end', this.eventEmitter.emit.bind(this.eventEmitter, '--request-end', JSON.parse(chunk as string) as T))
  }

  get headers(): IncomingHttpHeaders {
    return {
      'content-type': 'application/json',
    }
  }

  on(event: 'data', handler: Func<Buffer>): Minimum.HttpResponse
  on(event: 'end', handler: Action0): Minimum.HttpResponse
  on(event: 'error', handler: Func<Error>): Minimum.HttpResponse
  on(event: 'data' | 'end' | 'error', handler: Action0 | Func<Buffer> | Func<Error>): Minimum.HttpResponse {
    this.eventEmitter.on(event, handler)
    return this
  }
}

class EmptyResponse extends Response<Record<string, unknown>> {
  #handleRequestEnd(_: Record<string, unknown>, cb: MaybeCallback) {
    this.eventEmitter.emit('end')
    if (cb)
      cb()
  }

  constructor(chunk: unknown, request: EventEmitter) {
    super(chunk, request)
    this.eventEmitter.on('--request-end', this.#handleRequestEnd.bind(this))
  }
}

class ErrorResponse extends Response<Record<string, unknown>> {
  constructor(chunk: unknown, request: EventEmitter, when: string) {
    super(chunk, request)
    const template = {
      request: request.emit.bind(request, 'error', new Error()) as Action0,
      response: this.eventEmitter.emit.bind(this.eventEmitter, 'error', new Error()) as Action0,
    } as const
    if (when in template)
      queueMicrotask(template[when])
  }
}

class ImageResponse extends Response<Record<string, unknown>> {
  #handleRequestEnd(_: Record<string, unknown>, cb: MaybeCallback) {
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

  constructor(chunk: unknown, request: EventEmitter) {
    super(chunk, request)
    this.eventEmitter.on('--request-end', this.#handleRequestEnd.bind(this))
  }
}

class ImageSummaryResponse extends Response<Record<string, unknown>> {
  #handleRequestEnd(_: Record<string, unknown>, cb: MaybeCallback) {
    this.respond(cb, { message: 'this is a message' })
  }

  constructor(chunk: unknown, request: EventEmitter) {
    super(chunk, request)
    this.eventEmitter.on('--request-end', this.#handleRequestEnd.bind(this))
  }
}

class LoginResponse extends Response<DockerHub.LoginParameters> {
  #handleRequestEnd(req: DockerHub.LoginParameters, cb: MaybeCallback) {
    const index = +(req.username === 'invalidtestuser') * 2 + +(req.password === 'nopassword')
    const response1 = { token: 'foobar' }
    const response2 = { detail: 'Incorrect authentication credentials' }
    const responses = [response1, response1, response1, response2]
    this.respond(cb, responses[index])
  }

  constructor(chunk: unknown, request: EventEmitter) {
    super(chunk, request)
    this.eventEmitter.on('--request-end', this.#handleRequestEnd.bind(this))
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
  #handleRequestEnd(req: DockerHub.Description, cb: MaybeCallback) {
    this.respond(cb, { message: `${req.overview} has been set to ${req.repo}` })
  }

  constructor(chunk: unknown, request: EventEmitter, private readonly repository: string) {
    super(chunk, request)
    this.eventEmitter.on('--request-end', this.#handleRequestEnd.bind(this))
  }
}
