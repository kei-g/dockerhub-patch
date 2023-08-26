import { CommonFieldsOfCookie, Cookie } from '..'

/**
 * Type of a function that accepts a string.
 */
type Acceptor = (text: string) => void

/**
 * Abstract class to give keys and values to a cookie.
 */
abstract class CookieVisitor {
  /**
   * Handles a datum for the cookie.
   *
   * @param {ParsedCookie} cookie a cookie to give keys and values.
   *
   * @param {KeyValuePair} datum a datum to be passed to the cookie.
   *
   * @returns {boolean} True to abort. Otherwise, subsequent data will be handled if present.
   */
  protected abstract handle(cookie: ParsedCookie, datum: KeyValuePair): boolean

  /**
   * Visits a cookie with the specified data.
   *
   * @param {ParsedCookie} cookie
   *
   * @param {KeyValuePair[]} data
   */
  visit(cookie: ParsedCookie, data: KeyValuePair[]): void {
    for (const datum of data)
      if (this.handle(cookie, datum))
        break
  }
}

/**
 * Concrete class to give keys and values to a cookie.
 */
class FussyCookieVisitor extends CookieVisitor {
  /**
   * Constructor.
   *
   * @param {Acceptor} preferredMethod
   * @param {string} preferredKey
   */
  constructor(private readonly preferredMethod: Acceptor, private readonly preferredKey: string) {
    super()
  }

  /**
   * Handles a datum for the cookie.
   *
   * @param {ParsedCookie} cookie a cookie to give keys and values.
   *
   * @param {KeyValuePair} datum a datum to be passed to the cookie.
   *
   * @returns {boolean} True to abort. Otherwise, subsequent data will be handled if present.
   */
  protected handle(cookie: ParsedCookie, datum: KeyValuePair): boolean {
    const preferred = datum.key === this.preferredKey
    if (preferred) {
      const accept = this.preferredMethod.bind(cookie)
      accept(datum.value)
    }
    return preferred
  }
}

class GreedyCookieVisitor extends CookieVisitor {
  /**
   * Handles a datum for the cookie.
   *
   * @param {ParsedCookie} cookie a cookie to give keys and values.
   *
   * @param {KeyValuePair} datum a datum to be passed to the cookie.
   *
   * @returns {boolean} Always false.
   */
  protected handle(cookie: ParsedCookie, datum: KeyValuePair): boolean {
    cookie.accept(datum)
    return false
  }
}

/**
 * Type for key and value.
 */
type KeyValuePair = {
  key: string
  value: string
}

class ParsedCookie implements Cookie {
  readonly common: CommonFieldsOfCookie
  readonly fields: Record<string, string> = {}

  constructor() {
    this.common = {
      Domain: undefined,
      Expires: undefined,
      Path: undefined,
    }
  }

  accept(data: KeyValuePair): void {
    this.fields[data.key] = data.value
  }

  acceptDomain(domain: string): void {
    this.common.Domain = domain
  }

  acceptExpires(expires: string): void {
    this.common.Expires = new Date(expires)
  }

  acceptHttpOnly(_httpOnly: string): void {
    this.common.HttpOnly = true
  }

  acceptPath(path: string): void {
    this.common.Path = path
  }

  acceptSecure(_secure: string): void {
    this.common.Secure = true
  }

  toString(): string {
    let i = 0
    const pairs = new Array<string>(this.fields.length)
    for (const name in this.fields)
      pairs[i++] = `${name}=${this.fields[name]}`
    return pairs.join('; ').trim()
  }
}

/**
 * Dummy object.
 */
const dummy = new ParsedCookie()

/**
 * Converts a string to HTTP Cookie
 *
 * @param s {string} A string to convert
 *
 * @return {Cookie} HTTP Cookie
 */
export const toCookie = (s: string): Cookie => {
  const cookie = new ParsedCookie()
  const data = new Array<KeyValuePair>()
  for (const pair of s.split(';')) {
    const kv = pair.split('=')
    const key = kv[0].trim()
    const value = kv.slice(1).join('=')
    data.push({ key, value })
  }
  for (const visitor of visitors)
    visitor.visit(cookie, data)
  return cookie
}

/**
 * Array of visitors to parse HTTP cookie.
 */
const visitors = [
  new FussyCookieVisitor(dummy.acceptDomain, 'Domain'),
  new FussyCookieVisitor(dummy.acceptExpires, 'Expires'),
  new FussyCookieVisitor(dummy.acceptHttpOnly, 'HttpOnly'),
  new FussyCookieVisitor(dummy.acceptPath, 'Path'),
  new FussyCookieVisitor(dummy.acceptSecure, 'Secure'),
  new GreedyCookieVisitor(),
]
