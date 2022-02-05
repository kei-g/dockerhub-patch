/**
 * HTTP Cookie
 */
export type Cookie = {
  /**
   * Common values
   */
  common: {
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

  /**
   * Names and values
   */
  fields: Record<string, string>
}
