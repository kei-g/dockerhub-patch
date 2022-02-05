import { CookieBaker, DockerHub, dockerHubAsync, loginAsync } from '.'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import * as https from 'https'

const password = process.env.DOCKERHUB_PASSWORD as string
const username = process.env.DOCKERHUB_USERNAME as string

describe(
  'DockerHub',
  () => {
    const agent = new https.Agent({
      keepAlive: true
    })
    const baker = CookieBaker.default
    it(
      'login - failure',
      async () => {
        const login = await loginAsync(
          {
            agent,
            password: 'nopassword',
            username: 'invalidtestuser',
          }
        )
        if ('detail' in login) {
          expect(login.detail).to.be.a('string')
          expect(login.detail).to.be.eq('Incorrect authentication credentials')
          expect(login.token).to.be.undefined
        }
      }
    )
    if (typeof password === 'string' && typeof username === 'string')
      it(
        'login - success',
        async () => {
          const login = await loginAsync(
            {
              agent,
              baker,
              password,
              username,
            }
          )
          if ('token' in login) {
            expect(login.detail).to.be.undefined
            expect(login.token).to.be.a('string')
            const image = await dockerHubAsync<DockerHub.Image>(
              'repositories/snowstep/apt-fast/',
              {
                agent,
                baker,
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
      'without agent',
      async () => {
        const response = await dockerHubAsync<DockerHub.Error>(
          'namespaces/snowstep/repositories/apt-fast/images-summary',
          {
            baker,
            payload: {},
          }
        )
        expect(response.message).to.be.a('string')
      }
    )
  }
)

describe(
  'Environment Variable - Are DOCKERHUB_* specified?',
  () => {
    it(
      'Is DOCKERHUB_PASSWORD specified?',
      () => expect(password).to.be.a('string')
    )
    it(
      'Is DOCKERHUB_USERNAME specified?',
      () => expect(username).to.be.a('string')
    )
  }
)
