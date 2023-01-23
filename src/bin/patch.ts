import { Agent } from 'https'
import { CookieBaker, loginAsync, setDescriptionAsync } from '..'
import { getInput, setFailed, setOutput, setSecret } from '@actions/core'
import { readFileSync } from 'fs'

const main = async <T>(): Promise<T> => {
  const description = getInput('description', { required: true })
  const overview = getInput('overview') || readFileSync('README.md').toString()
  const password = getInput('password', { required: true })
  setSecret(password)
  const repo = getInput('repo', { required: true })
  const username = getInput('username', { required: true })
  const agent = new Agent({
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
  (err: string | Error) => setFailed(err)
).then(
  (value: unknown) => typeof value === 'undefined' || setOutput('response', value)
)
