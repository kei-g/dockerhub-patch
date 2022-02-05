import { CookieBaker } from '..'
import * as http from 'http'
import * as https from 'https'

/**
 * Type of basic parameters for `CommunicationParameters`
 */
export type BasicCommunicationParameters = {
  /**
   * HTTP agent (optional)
   */
  agent?: http.Agent | https.Agent

  /**
   * Cookie baker (optional)
   */
  baker?: CookieBaker
}

/**
 * Type of parameters for `CommunicationParameters` without URL
 */
export type CommunicationParametersWithoutURL = BasicCommunicationParameters & {
  /**
   * HTTP method (optional)
   *
   * Default value is 'GET' if `payload` does not present, otherwise 'POST'
   */
  method?: 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT'

  /**
   * Payload to be sent (optional)
   */
  payload?: Record<string, unknown>

  /**
   * Token (optional for login, required after login)
   */
  token?: string
}

/**
 * Type of parameters for `communicateAsync`
 */
export type CommunicationParameters = CommunicationParametersWithoutURL & {
  /**
   * URL
   */
  url: string
}

/**
 * Communicates with DockerHub
 *
 * @param params {CommunicationParameters} Parameters to communicate
 *
 * @param cb {(err: Error, value: T) => void} Callback function
 */
const communicate = <T>(
  params: CommunicationParameters,
  cb: (err: Error, value: T) => void
): void => {
  const content = params.payload && JSON.stringify(params.payload)
  const headers = {
    'Content-length': content?.length ?? 0,
  } as {
    Authorization?: string,
    'Content-length': number,
    'Content-type'?: string,
  }
  if (params.payload)
    headers['Content-type'] = 'application/json'
  if (params.token)
    headers.Authorization = `Bearer ${params.token}`
  const opts = {
    headers,
    method: params.method || (params.payload ? 'POST' : 'GET'),
  } as Record<string, unknown>
  if (params.agent)
    opts.agent = params.agent
  const req = https.request(
    params.url,
    opts,
    (res: http.IncomingMessage) => receiveResponse(res, cb)
  )
  params.baker?.bake(req)
  req.on('error', (err: Error) => cb(err, undefined))
  if (content)
    req.write(content)
  req.end()
}

/**
 * Communicates with DockerHub
 *
 * @param params {CommunicationParameters} Parameters to communicate
 *
 * @returns A promise
 */
export const communicateAsync = <T>(params: CommunicationParameters): Promise<T> =>
  new Promise(
    (resolve: (value: T) => void, reject: (reason?: unknown) => void) =>
      communicate(
        params,
        (err: Error, value: T) =>
          err
            ? reject(err)
            : resolve(value)
      )
  )

/**
 * Receives response from DockerHub
 *
 * @param res {http.IncomingMessage} Response
 *
 * @param cb {(err: Error, value: T) => void} Callback function
 */
const receiveResponse = <T>(
  res: http.IncomingMessage,
  cb: (err: Error, value: T) => void
): void => {
  const context = {} as { data?: Buffer }
  res.on(
    'data',
    (data: Buffer) =>
      context.data = context.data
        ? Buffer.concat([context.data, data])
        : data
  )
  res.on(
    'end',
    () => context.data
      ? cb(undefined, JSON.parse(context.data.toString()) as T)
      : cb(new Error('No data'), undefined)
  )
  res.on(
    'error',
    (err: Error) => cb(err, undefined)
  )
}
