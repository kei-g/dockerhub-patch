import * as http from 'http'
import * as https from 'https'

export namespace Minimum {
  export interface HttpModule {
    request(url: string, opts: https.RequestOptions, cb: (res: HttpResponse) => void): HttpRequest
  }

  export interface HttpRequest {
    end(cb?: () => void): HttpRequest
    get host(): string
    on(event: 'error', handler: (err: Error) => void): HttpRequest
    on(event: 'response', handler: (res: HttpResponse) => void): HttpRequest
    setHeader(name: string, value: string | number | readonly string[]): HttpRequest
    write(chunk: unknown): boolean
  }

  export interface HttpResponse {
    get headers(): http.IncomingHttpHeaders
    on(event: 'data', handler: (data: Buffer) => void): HttpResponse
    on(event: 'end', handler: () => void): HttpResponse
    on(event: 'error', handler: (err: Error) => void): HttpResponse
  }
}
