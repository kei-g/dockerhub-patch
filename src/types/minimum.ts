import * as http from 'http'
import * as https from 'https'

export namespace Minimum {
  export interface HttpModule {
    request(_url: string, _opts: https.RequestOptions, _cb: (_res: HttpResponse) => void): HttpRequest
  }

  export interface HttpRequest {
    end(_cb?: () => void): HttpRequest
    get host(): string
    on(_event: 'error', _handler: (_err: Error) => void): HttpRequest
    on(_event: 'response', _handler: (_res: HttpResponse) => void): HttpRequest
    setHeader(_name: string, _value: string | number | readonly string[]): HttpRequest
    write(_chunk: unknown): boolean
  }

  export interface HttpResponse {
    get headers(): http.IncomingHttpHeaders
    on(_event: 'data', _handler: (_data: Buffer) => void): HttpResponse
    on(_event: 'end', _handler: () => void): HttpResponse
    on(_event: 'error', _handler: (_err: Error) => void): HttpResponse
  }
}
