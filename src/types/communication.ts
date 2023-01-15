import { CookieBaker, Minimum } from '..'
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

  /**
   * HTTP module (optional)
   *
   * https is used if this property is unspecified
   */
  http?: Minimum.HttpModule
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
