import { Cookie, Minimum, toCookie } from '..'

/**
 * HTTP Cookie Baker
 */
export class CookieBaker {
  /**
   * The default instance
   */
  private static readonly theOne = new CookieBaker()

  /**
   * Gets the default instance
   *
   * @return {CookieBaker} The default instance
   */
  static get default(): CookieBaker {
    return CookieBaker.theOne
  }

  /**
   * Arrays of HTTP Cookie grouped by host
   */
  private readonly cookies = {} as Record<string, Cookie[]>

  /**
   * Wraps a HTTP client request
   *
   * @param req {T} A HTTP request
   *
   * @return {T} The request wrapped by this manager
   */
  bake<T extends Minimum.HttpRequest>(req: T): T {
    const cookie = this.get(req.host)?.map(
      (c: Cookie) => c.toString()
    )?.join('; ')?.trim()
    if (cookie?.length)
      req.setHeader('Cookie', cookie)
    req.on('response', (res: Minimum.HttpResponse) => {
      if ('set-cookie' in res.headers)
        this.cookies[req.host] = res.headers['set-cookie'].map(toCookie)
    })
    return req
  }

  /**
   * Gets cookies for specified host
   *
   * @param host {string} A host
   *
   * @return {Cookie[]} Array of `Cookie`
   */
  get(host: string): Cookie[] {
    if (host in this.cookies) {
      const now = Date.now()
      const cookies = this.cookies[host].filter(
        (c: Cookie) => now < c.common.Expires.getTime()
      )
      if (cookies.length)
        return this.cookies[host] = cookies
      delete this.cookies[host]
    }
  }
}
