[![`docker/patch`][github-repo-image]][github-repo-url] [![License][license-image]][license-url]

# kei-g/dockerhub-patch

[`kei-g/dockerhub-patch`][github-repo-url] - Patches description and overview to DockerHub.

[![Coverage][nyc-cov-image]][github-coverage-url]

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
| overview | Full-text description of your docker image. If absent, the content of 'README.md' will be used as this. | false |
| password | Your password on DockerHub. | true |
| repo | Repository name of your docker image. | true |
| username | Your name on DockerHub. This field will be prepended to `repo` with '/'. | true |

## Action Outputs

| Output name | Description |
|-|-|
| response | The response from DockerHub. |

## Example

```yaml
env:
  IMAGE_NAME: example
jobs:
  publish:
    name: Publish the docker image
    runs-on: ubuntu-latest
    steps:
      - name: Checkout the repository
        uses: actions/checkout@v3
        with:
          fetch-depth: 1
          submodules: true
      - id: metadata
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
            ${{ secrets.DOCKERHUB_USERNAME }}/${{ env.IMAGE_NAME }}:latest
            ${{ steps.metadata.outputs.tags }}
      - name: Patch the description
        uses: kei-g/dockerhub/patch@main
        with:
          description: An example image.
          password: ${{ secrets.DOCKERHUB_PASSWORD }}
          repo: ${{ env.IMAGE_NAME }}
          username: ${{ secrets.DOCKERHUB_USERNAME }}
name: Example
on:
  push:
    branches-ignore:
      - '**'
    tags:
```

## License

The scripts and documentation in this project are released under the [BSD-3-Clause License](https://github.com/kei-g/dockerhub-patch/blob/main/LICENSE)

## Contributions

Contributions are welcome! See [Contributor's Guide](https://github.com/kei-g/dockerhub-patch/blob/main/CONTRIBUTING.md)

### Code of Conduct

:clap: Be nice. See [our code of conduct](https://github.com/kei-g/dockerhub-patch/blob/main/CODE_OF_CONDUCT.md)

[github-build-image]:https://github.com/kei-g/dockerhub-patch/actions/workflows/build.yml/badge.svg?branch=main
[github-build-url]:https://github.com/kei-g/dockerhub-patch/actions/workflows/build.yml?query=branch%3Amain
[github-codeql-image]:https://github.com/kei-g/dockerhub-patch/actions/workflows/codeql.yml/badge.svg?branch=main
[github-codeql-url]:https://github.com/kei-g/dockerhub-patch/actions/workflows/codeql.yml?query=branch%3Amain
[github-coverage-image]:https://github.com/kei-g/dockerhub-patch/actions/workflows/coverage.yml/badge.svg?branch=main
[github-coverage-url]:https://github.com/kei-g/dockerhub-patch/actions/workflows/coverage.yml?query=branch%3Amain
[github-repo-image]:https://img.shields.io/badge/github-kei--g%2Fdockerhub--patch-232931?logo=github
[github-repo-url]:https://github.com/kei-g/dockerhub-patch
[license-image]:https://img.shields.io/github/license/kei-g/dockerhub-patch
[license-url]:https://github.com/kei-g/dockerhub-patch/blob/main/LICENSE
[nyc-cov-image]:https://img.shields.io/nycrc/kei-g/dockerhub-patch?config=.nycrc.json&label=coverage&logo=mocha
