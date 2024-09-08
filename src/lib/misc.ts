import { Action1, Action2 } from '..'

/**
 * Binds the second argument of a function.
 *
 * @param {T2} arg2
 *
 * @param {Action2<T1, T2, R>} func A function to be bound.
 *
 * @returns {Action1<T1, R>} The bound function.
 */
export const bind2nd = <T1, T2, R>(arg2: T2, func: Action2<T1, T2, R>): Action1<T1, R> =>
  (arg1: T1) => func(arg1, arg2)

/**
 * Creates an executor for Promise.
 *
 * @param {Action1<T, void>} resolve a function to resolve the promise.
 *
 * @param {Action1<unknown, void>} reject a function to reject the promise.
 *
 * @returns {Action2<Error, T, void>} An executor for Promise.
 */
export const createExecutor = <T>(resolve: Action1<T, void>, reject: Action1<unknown, void>): Action2<Error, T, void> =>
  (error: Error, value: T) => error ? reject(error) : resolve(value)

/**
 *
 * @param value
 * @param alternateValue
 * @returns
 */
export const nullishCoalesce = <T>(value: T | undefined, alternateValue: T) => value ?? alternateValue

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
export const substituteIf = <T, U, V>(test: T, obj: { [key: string]: (U | V) }, key: keyof { [key: string]: (U | V) }, value: V) => {
  if (test)
    obj[key] = value
}
