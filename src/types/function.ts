/**
 * Type of a function that takes single argument generalized with T,
 * and its return type is also generalized with R.
 */
export type Action1<T, R> = (arg: T) => R

/**
 * Type of a function that takes two arguments generalized with T1 and T2,
 * and its return type is also generalized with R.
 */
export type Action2<T1, T2, R> = (arg1: T1, arg2: T2) => R

/**
 * Type of a function that accepts 2 arguments, Error and <T>.
 */
export type Callback<T> = (error: Error, value: T) => void
