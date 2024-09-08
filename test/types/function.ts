import { Action1, Minimum } from '..'

export type Action0<U = void> = () => U

export type Func<T, U = void> = Action1<T, U>

export type MaybeCallback = Action0 | undefined

export type ResponseCallback = Func<Minimum.HttpResponse>
