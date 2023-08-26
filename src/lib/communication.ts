import { CommunicationParameters, Minimum } from '..'
import * as https from 'https'

/**
 * Type of a function that takes single argument generalized with T,
 * and its return type is also generalized with R.
 */
type Action1<T, R> = (arg: T) => R

/**
 * Type of a function that takes two arguments generalized with T1 and T2,
 * and its return type is also generalized with R.
 */
type Action2<T1, T2, R> = (arg1: T1, arg2: T2) => R

/**
 * Type of a function that accepts 2 arguments, Error and <T>.
 */
type Callback<T> = (error: Error, value: T) => void

/**
 * Binds the second argument of a function.
 *
 * @param {T2} arg2
 *
 * @param {Action2<T1, T2, R>} func A function to be bound.
 *
 * @returns {Action1<T1, R>} The bound function.
 */
const bind2nd = <T1, T2, R>(arg2: T2, func: Action2<T1, T2, R>): Action1<T1, R> => (arg1: T1) => func(arg1, arg2)

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
export const communicateAsync = <T>(params: CommunicationParameters): Promise<T> => new Promise((resolve: (value: T) => void, reject: (reason?: unknown) => void) => communicate(params, createExecutor(resolve, reject)))

/**
 * Creates an executor for Promise.
 *
 * @param {Action1<T, void>} resolve a function to resolve the promise.
 *
 * @param {Action1<unknown, void>} reject a function to reject the promise.
 *
 * @returns {Action2<Error, T, void>} An executor for Promise.
 */
const createExecutor = <T>(resolve: Action1<T, void>, reject: Action1<unknown, void>): Action2<Error, T, void> => (error: Error, value: T) => error ? reject(error) : resolve(value)

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

/**
 * Substitutes a value to an object of a specified key if the first argument is true.
 *
 * @param {T} test If true, substitution will be executed.
 *
 * @param {{ [key: string]: (U | V)}} obj An object.
 *
 * @param {keyof { [key: string]: (U | V) }} key A specific key of the object.
 *
 * @param {V} value A value to be set.
 */
const substituteIf = <T, U, V>(test: T, obj: { [key: string]: (U | V) }, key: keyof { [key: string]: (U | V) }, value: V) => {
  if (test)
    obj[key] = value
}
