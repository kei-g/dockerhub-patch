/**
 * HTTP Cookie
 */
export type Cookie = {
  /**
   * Common values
   */
  common: CommonFieldsOfCookie

  /**
   * Names and values
   */
  fields: Record<string, string>
}

/**
 * Common fields of Cookie
 */
export type CommonFieldsOfCookie = {
  /**
   * Domain name
   */
  Domain: string

  /**
   * Expiration date
   */
  Expires: Date

  /**
   * A flag to prevent being used by JavaScript
   */
  HttpOnly?: true

  /**
   * Path
   */
  Path: string

  /**
   * A flag to prevent being used during insecure HTTP sessions
   */
  Secure?: true
}
