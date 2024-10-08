import type { CommunicationParameters, CommunicationParametersWithoutURL, DockerHub } from '..'
import { communicateAsync } from '..'
import { substituteIf } from './misc'

/**
 * Send a request to DockerHub
 *
 * @param path
 *
 * @param params
 *
 * @return
 */
export const dockerHubAsync = <T>(
  path: string,
  params: CommunicationParametersWithoutURL
): Promise<T> => {
  const opts = params as CommunicationParameters
  opts.url = `https://hub.docker.com/v2/${path}`
  return communicateAsync<T>(opts)
}

/**
 * Login to DockerHub
 *
 * @param params
 *
 * @return A promise
 */
export const loginAsync = (
  params: DockerHub.LoginParameters
): Promise<DockerHub.Error | DockerHub.LoginResponse> => {
  const opts = {
    method: 'POST',
    payload: {
      password: params.password,
      username: params.username,
    },
  } as CommunicationParametersWithoutURL
  substituteIf(params.agent, opts, 'agent', params.agent)
  substituteIf(params.baker, opts, 'baker', params.baker)
  substituteIf(params.http, opts, 'http', params.http)
  return dockerHubAsync<DockerHub.Error | DockerHub.LoginResponse>('users/login', opts)
}

/**
 * Sets the description of a docker image
 *
 * @param params
 *
 * @return A promise
 */
export const setDescriptionAsync = (
  params: DockerHub.Description
): Promise<unknown> => {
  const opts = {
    method: 'PATCH',
    payload: {
      description: params.description,
      full_description: params.overview,
    },
    token: params.token,
  } as CommunicationParametersWithoutURL
  substituteIf(params.agent, opts, 'agent', params.agent)
  substituteIf(params.baker, opts, 'baker', params.baker)
  substituteIf(params.http, opts, 'http', params.http)
  return dockerHubAsync<unknown>(`repositories/${params.repo}`, opts)
}
