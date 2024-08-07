# Practical Module Federation

"Practical Module Federation" is an example repository about the new and innovative live code sharing mechanism of Webpack 5. It guides you through everything you need to get started with Module Federation. It covers the internal implementation of Module Federation and how Module Federation fits with other sharing options. The project also addresses many practical topics, including sharing state in shared code, different deployment options, sharing code unrelated to the view, writing your code to be resilient to code and network failures, and much more.

## Using this example

Run the following command:

```sh
pnpm i && pnpm dev
```

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `remote`: a [rsbuild](https://rsbuild.dev/) app
- `shell`: a [rsbuild](https://rsbuild.dev/) sapp
- `@repo/eslint-config`: ESLint configurations used throughout the monorepo
- `@repo/jest-presets`: Jest configurations
- `@repo/logger`: isomorphic logger (a small wrapper around console.log)
- `@repo/ui`: a dummy React UI library (which contains `<CounterButton>` and `<Link>` components)
- `@repo/typescript-config`: tsconfig.json's used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).


This example also shows how to use [Workspace Configurations](https://turbo.build/repo/docs/core-concepts/monorepos/configuring-workspaces).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
