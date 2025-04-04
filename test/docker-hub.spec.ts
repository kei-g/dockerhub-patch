import assert, { equal } from 'node:assert'
import type { DockerHub } from '.'
import { Agent } from 'node:https'
import { CookieBaker, PseudoDockerhub, dockerHubAsync, loginAsync, setDescriptionAsync } from '.'
import { describe, it } from 'mocha'

describe(
  'DockerHub',
  () => {
    const agent = new Agent({
      keepAlive: true
    })
    const baker = CookieBaker.default
    const http = new PseudoDockerhub()
    it(
      'catch error - request',
      async () => {
        const promise = dockerHubAsync(
          'error/request',
          {
            agent,
            baker,
            http,
            payload: {},
          }
        )
        let caught: unknown
        await promise.catch((reason: unknown) => caught = reason)
        assert(caught instanceof Error)
      }
    )
    it(
      'catch error - response',
      async () => {
        const promise = dockerHubAsync(
          'error/response',
          {
            agent,
            baker,
            http,
            payload: {},
          }
        )
        let caught: unknown
        await promise.catch((reason: unknown) => caught = reason)
        assert(caught instanceof Error)
      }
    )
    it(
      'empty response',
      async () => {
        const promise = dockerHubAsync(
          'empty',
          {
            agent,
            baker,
            http,
            payload: {},
          }
        )
        let caught: unknown
        await promise.catch((reason: unknown) => caught = reason)
        assert(caught instanceof Error)
      }
    )
    it(
      'expire cookie',
      async () => {
        const login = await loginAsync(
          {
            baker,
            http,
            password: 'valid-password',
            username: 'valid-user',
          }
        )
        assert(Object.hasOwn(login, 'token'))
        if ('token' in login)
          return new Promise(
            (resolve: (value: unknown) => void) => {
              setTimeout(
                async () => {
                  const response = await dockerHubAsync<DockerHub.Error>(
                    'namespaces/snowstep/repositories/apt-fast/images-summary',
                    {
                      baker,
                      http,
                      payload: {},
                      token: login.token,
                    }
                  )
                  equal(typeof response.message, 'string')
                  resolve(undefined)
                },
                100
              )
            }
          )
      }
    )
    it(
      'login - failure',
      async () => {
        const login = await loginAsync(
          {
            agent,
            http,
            password: 'nopassword',
            username: 'invalidtestuser',
          }
        )
        assert(Object.hasOwn(login, 'detail'))
        if ('detail' in login) {
          equal(typeof login.detail, 'string')
          equal(login.detail, 'Incorrect authentication credentials')
          equal(login.token, undefined)
        }
      }
    )
    it(
      'login - success',
      async () => {
        const login = await loginAsync(
          {
            agent,
            baker,
            http,
            password: 'valid-password',
            username: 'valid-user',
          }
        )
        assert(Object.hasOwn(login, 'token'))
        if ('token' in login) {
          equal(login.detail, undefined)
          equal(typeof login.token, 'string')
          const image = await dockerHubAsync<DockerHub.Image>(
            'repositories/snowstep/apt-fast/',
            {
              agent,
              baker,
              http,
              token: login.token,
            }
          )
          equal(image.hub_user, 'snowstep')
          equal(image.name, 'apt-fast')
          equal(image.namespace, 'snowstep')
          equal(image.user, 'snowstep')
        }
      }
    )
    it(
      'patch with agent and cookie-baker',
      async () => {
        const login = await loginAsync(
          {
            agent,
            baker,
            http,
            password: 'valid-password',
            username: 'valid-user',
          }
        )
        assert(Object.hasOwn(login, 'token'))
        if ('token' in login && typeof login.token === 'string') {
          equal(login.detail, undefined)
          equal(typeof login.token, 'string')
          await setDescriptionAsync(
            {
              agent,
              baker,
              description: 'This is a single-line description.',
              http,
              overview: 'This is the full-text long description.',
              repo: 'snowstep/apt-fast',
              token: login.token,
            }
          )
        }
      }
    )
    it(
      'patch with neither agent nor cookie-baker',
      async () => {
        const login = await loginAsync(
          {
            http,
            password: 'valid-password',
            username: 'valid-user',
          }
        )
        assert(Object.hasOwn(login, 'token'))
        if ('token' in login && typeof login.token === 'string') {
          equal(login.detail, undefined)
          equal(typeof login.token, 'string')
          await setDescriptionAsync(
            {
              description: 'This is a single-line description.',
              http,
              overview: 'This is the full-text long description.',
              repo: 'snowstep/apt-fast',
              token: login.token,
            }
          )
        }
      }
    )
    it(
      'without agent',
      async () => {
        const login = await loginAsync(
          {
            baker,
            http,
            password: 'valid-password',
            username: 'valid-user',
          }
        )
        assert(Object.hasOwn(login, 'token'))
        if ('token' in login) {
          const response = await dockerHubAsync<DockerHub.Error>(
            'namespaces/snowstep/repositories/apt-fast/images-summary',
            {
              baker,
              http,
              payload: {},
              token: login.token,
            }
          )
          equal(typeof response.message, 'string')
        }
      }
    )
  }
)
