# dockerhub-patch [![License][license-image]][license-url]

[![Coverage][nyc-cov-image]][github-url]

[`dockerhub-patch`][github-url] - Patches description and overview to DockerHub

## CI Status

| Workflow Name | Status |
|:-:|:-:|
| **Build** | [![GitHub CI (Build)][github-build-image]][github-build-url] |
| **CodeQL** | [![GitHub CI (CodeQL)][github-codeql-image]][github-codeql-url] |
| **Coverage** | [![GitHub CI (Coverage)][github-coverage-image]][github-coverage-url] |

## Action Inputs

| Input name | Description | Required |
|-|-|-|
| description | Single-line description of your docker image. | true |
| overview | Full-text description of your docker image. Typically the content of 'README.md'. | true |
| password | Your password on DockerHub. | true |
| repo | Repository name of your docker image. | true |
| username | Your name on DockerHub. This field will be prepended to `repo` with '/'. | true |

## Action Outputs

This actions won't output anything.

## Example

```yaml
env:
  IMAGE_NAME: example
jobs:
  publish:
    name: Publish the docker image
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 1
      - id: meta
        name: Docker metadata
        uses: docker/metadata-action@v4
        with:
          images: ${{ secrets.DOCKERHUB_USERNAME }}/${{ env.IMAGE_NAME }}
          tags: |
            type=semver,pattern={{major}}
            type=semver,pattern={{major}}.{{minor}}
            type=semver,pattern={{version}}
      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v2
      - name: Login to DockerHub
        uses: docker/login-action@v2
        with:
          password: ${{ secrets.DOCKERHUB_PASSWORD }}
          username: ${{ secrets.DOCKERHUB_USERNAME }}
      - name: Run Buildx and Push it to DockerHub
        uses: docker/build-push-action@v3
        with:
          context: .
          push: true
          tags: |
            ${{ steps.meta.outputs.tags }}
      - id: overview
        name: Load the overview from README.md
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('node:fs')
            fs.readFile('README.md', {}, (err, data) => {
              if (err)
                core.setFailed(err.message)
              else
                core.setOutput('content', data.toString())
            })
      - name: Patch the description
        uses: kei-g/dockerhub-patch@main
        with:
          description: An example image
          overview: |
            ${{ steps.overview.outputs.content }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}
          repo: ${{ env.IMAGE_NAME }}
          username: ${{ secrets.DOCKERHUB_USERNAME }}
name: Example
on:
  create:
    tags:
```

[github-url]:https://github.com/kei-g/dockerhub-patch
[github-build-image]:https://github.com/kei-g/dockerhub-patch/actions/workflows/build.yml/badge.svg?branch=main
[github-build-url]:https://github.com/kei-g/dockerhub-patch/actions/workflows/build.yml?query=branch%3Amain
[github-codeql-image]:https://github.com/kei-g/dockerhub-patch/actions/workflows/codeql.yml/badge.svg?branch=main
[github-codeql-url]:https://github.com/kei-g/dockerhub-patch/actions/workflows/codeql.yml?query=branch%3Amain
[github-coverage-image]:https://github.com/kei-g/dockerhub-patch/actions/workflows/coverage.yml/badge.svg?branch=main
[github-coverage-url]:https://github.com/kei-g/dockerhub-patch/actions/workflows/coverage.yml?query=branch%3Amain
[license-image]:https://img.shields.io/github/license/kei-g/dockerhub-patch
[license-url]:https://github.com/kei-g/dockerhub-patch/blob/main/LICENSE
[nyc-cov-image]:https://img.shields.io/nycrc/kei-g/dockerhub-patch?config=.nycrc.json&label=coverage&logo=mocha
