import { BasicCommunicationParameters } from '..'

/**
 * DockerHub namespace
 */
export namespace DockerHub {
  /**
   * Request type to set description of a docker image
   */
  export type Description = BasicCommunicationParameters & {
    /**
     * Single-line short description
     */
    description: string

    /**
     * Full-text long description
     */
    overview: string

    /**
     * Repository name
     */
    repo: string

    /**
     * Token
     */
    token: string
  }

  /**
   * Response type of a docker image
   */
  export type Image = {
    /**
     * Affiliation
     */
    affiliation: string

    /**
     * True if the user can edit this image
     */
    can_edit: boolean

    /**
     * Number of collaborators
     */
    collaborator_count: number

    /**
     * Single-line short description
     */
    description: string

    /**
     * Overview
     */
    full_description: string

    /**
     * True if the image has been starred
     */
    has_starred: boolean

    /**
     * User name on GitHub?
     */
    hub_user: string

    /**
     * True if the image is automated
     */
    is_automated: boolean

    /**
     * True if the image is migrated
     */
    is_migrated: boolean

    /**
     * True if the image is private
     */
    is_private: boolean

    /**
     * Timestamp when the image is updated last time
     */
    last_updated: Date

    /**
     * Name of the image
     */
    name: string

    /**
     * Namespace of the image
     */
    namespace: string

    /**
     * Permissions of the image
     */
    permissions: {
      /**
       * True if admin
       */
      admin: boolean

      /**
       * True if the image is readable
       */
      read: boolean

      /**
       * True if the image is writeable
       */
      write: boolean
    }

    /**
     * Number of pulled count of the image
     */
    pull_count: number

    /**
     * Repository type
     */
    repository_type: string

    /**
     * Number of star of the image
     */
    star_count: number

    /**
     * Status of the image
     */
    status: number

    /**
     * User name of the image
     */
    user: string
  }

  /**
   * Response type of Error
   */
  export type Error = {
    /**
     * Error info
     */
    errinfo: {
      /**
       * ID of docker user
       */
      api_call_docker_id?: string

      /**
       * Name of API operation called
       */
      api_call_name?: string

      /**
       * Date/time of call start
       */
      api_call_start?: string

      /**
       * Unique ID for this call
       */
      api_call_txnid?: string
    }

    /**
     * The error message
     */
    message: string
  }

  /**
   * Request type to Login
   */
  export type LoginParameters = BasicCommunicationParameters & {
    /**
     * Password
     */
    password: string

    /**
     * User name
     */
    username: string
  }

  /**
   * Response type for Login
   */
  export type LoginResponse = {
    /**
     * The error message
     */
    detail?: string

    /**
     * Token
     */
    token?: string
  }
}
