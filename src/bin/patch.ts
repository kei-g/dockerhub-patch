import * as core from '@actions/core'
import * as https from 'https'
import { CookieBaker, loginAsync, setDescriptionAsync } from '..'

const main = async <T>(): Promise<T> => {
  const description = core.getInput('description', { required: true })
  const overview = core.getInput('overview', { required: true })
  const password = core.getInput('password', { required: true })
  core.setSecret(password)
  const repo = core.getInput('repo', { required: true })
  const username = core.getInput('username', { required: true })
  const agent = new https.Agent({
    keepAlive: true,
  })
  const baker = CookieBaker.default
  const login = await loginAsync({
    agent,
    baker,
    password,
    username,
  })
  return 'token' in login && typeof login.token === 'string'
    ? (
      await setDescriptionAsync(
        {
          agent,
          baker,
          description,
          overview,
          repo: `${username}/${repo}`,
          token: login.token,
        }
      )
    ) as T
    : Promise.reject(login) as T
}

main<unknown>().catch(
  (err: string | Error) => core.setFailed(err)
).then(
  (value: unknown) => typeof value === 'undefined' || core.setOutput('response', value)
)
