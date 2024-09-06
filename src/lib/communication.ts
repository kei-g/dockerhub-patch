import { Callback, CommunicationParameters, Minimum } from '..'
import { bind2nd, createExecutor, substituteIf } from './misc'
import * as https from 'https'

/**
 * Communicates with DockerHub
 *
 * @param params {CommunicationParameters} Parameters to communicate
 *
 * @param cb {Callback<T>} Callback function
 */
const communicate = <T>(params: CommunicationParameters, cb: Callback<T>): void => {
  const content = params.payload && JSON.stringify(params.payload)
  const headers = {
    'Content-length': content?.length ?? 0,
  } as {
    Authorization?: string,
    'Content-length': number,
    'Content-type'?: string,
  }
  substituteIf(params.payload, headers, 'Content-type', 'application/json')
  substituteIf(params.token, headers, 'Authorization', `Bearer: ${params.token}`)
  const methods = ['GET', 'POST']
  const opts = {
    headers,
    method: params.method || methods[+params.payload],
  } as Record<string, unknown>
  substituteIf(params.agent, opts, 'agent', params.agent)
  const req = (params.http ?? https).request(params.url, opts, bind2nd(cb, receiveResponse))
  params.baker?.bake(req)
  req.on('error', bind2nd(undefined, cb))
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
export const communicateAsync = <T>(params: CommunicationParameters): Promise<T> => new Promise((resolve: (_value: T) => void, reject: (_reason?: unknown) => void) => communicate(params, createExecutor(resolve, reject)))

/**
 * Receives response from DockerHub
 *
 * @param res {Minimum.HttpResponse} Response
 *
 * @param cb {Callback<T>} Callback function
 */
const receiveResponse = <T>(res: Minimum.HttpResponse, cb: Callback<T>): void => {
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
  res.on('error', bind2nd(undefined, cb))
}
