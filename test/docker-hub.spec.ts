import { Agent } from 'https'
import { CookieBaker, DockerHub, PseudoDockerhub, dockerHubAsync, loginAsync, setDescriptionAsync } from '.'
import { describe, it } from 'mocha'
import { expect } from 'chai'

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
        expect(caught).to.be.a.instanceOf(Error)
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
        expect(caught).to.be.a.instanceOf(Error)
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
        expect(caught).to.be.a.instanceOf(Error)
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
        expect(login).haveOwnProperty('token')
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
                  expect(response.message).to.be.a('string')
                  resolve(undefined)
                },
                5000
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
        expect(login).haveOwnProperty('detail')
        if ('detail' in login) {
          expect(login.detail).to.be.a('string')
          expect(login.detail).to.be.eq('Incorrect authentication credentials')
          expect(login.token).to.be.undefined
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
        expect(login).haveOwnProperty('token')
        if ('token' in login) {
          expect(login.detail).to.be.undefined
          expect(login.token).to.be.a('string')
          const image = await dockerHubAsync<DockerHub.Image>(
            'repositories/snowstep/apt-fast/',
            {
              agent,
              baker,
              http,
              token: login.token,
            }
          )
          expect(image.hub_user).to.be.eq('snowstep')
          expect(image.name).to.be.eq('apt-fast')
          expect(image.namespace).to.be.eq('snowstep')
          expect(image.user).to.be.eq('snowstep')
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
        expect(login).haveOwnProperty('token')
        if ('token' in login && typeof login.token === 'string') {
          expect(login.detail).to.be.undefined
          expect(login.token).to.be.a('string')
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
        expect(login).haveOwnProperty('token')
        if ('token' in login && typeof login.token === 'string') {
          expect(login.detail).to.be.undefined
          expect(login.token).to.be.a('string')
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
        expect(login).haveOwnProperty('token')
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
          expect(response.message).to.be.a('string')
        }
      }
    )
  }
)
