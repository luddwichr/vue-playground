# Yarn 3 + Vue 3 + Typescript + Vite + Jest + VS Code + ESLint + Prettier

## Setup project with Yarn, Typescript, Vite and Vue

- Install yarn (globally): `npm install yarn --global`
- Initialize vite project: `yarn create vite <PROJECT_NAME> --template vue-ts`
- Go to project folder: `cd <PROJECT_NAME>`
- Configure yarn version: `yarn set version stable`
- Install dependencies: `yarn install`
- Install `yarn plugin import interactive-tools` to conveniently update dependencies via `yarn upgrade-interactive` (see [here](https://yarnpkg.com/api/modules/plugin_interactive_tools.html) for more)
- Add some yarn support for Typescript: `yarn plugin import typescript` (see [here](https://yarnpkg.com/api/modules/plugin_typescript.html) for more)

### Good to know: What happens when running `yarn build` in this setup

- vue-tsc
- vite

TODO: elaborate...

## Setup Test runner

### Option A) Use jest

- Install dependencies for jest: `yarn add -D jest ts-jest jest-environment-jsdom` (see [Jest docs](https://jestjs.io/docs/getting-started#using-typescript-via-ts-jest) for more)
- Add entry `"test": "jest"` to `scripts` section of `package.json`
- Create Jest configuration file `jest.config.js`:
  ```js
  /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
  module.exports = {
    testEnvironment: 'jsdom', // we use jsdom instead of node since we test DOM stuff
    clearMocks: true, // convenience feature to ensure mocks are always cleared after each test
    transform: {
      '^.+\\.ts$': 'ts-jest' // use ts-jest to transform .ts files to .js
    },
    testEnvironmentOptions: {
      customExportConditions: ['node', 'node-addons'] // required for jest-environment-jsdom
    }
  };
  ```
  Note: this setup is a bit different than `yarn ts-jest config:init` (e.g `transform` is used instead of `preset`)
- Install dependencies for Vue testing: `yarn add -D @vue/test-utils @vue/vue3-jest @babel/core babel-jest @vue/compiler-sfc @vue/compiler-dom`
- Configure processing Single-File Components in `jest.config.js`:
  ```js
      moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
      transform: {
          "^.+\\.vue$": "@vue/vue3-jest",
          ...
      },
  ```

#### A note on using jest.config.ts (don't...)

I first really wanted the Jest config to be configured via a Typescript file for consistency.
However, this requires introducing several dependencies and a more complicated setup.
Therefore, I decided not to configure this demo project that way.
If you still want to do it, here are some hints how to do it:

1. Add required dependencies: `yarn add -D @jest/types ts-node source-map-support`
   - `@jest/types` to allow types used for `jest.config.ts`
   - `ts-node` is used by Jest in case a Typescript config file was found, to transform it to Javascript via JIT compilation
   - `source-map-support` is needed by ts-node
2. Transform `jest.config.js` to `jest.config.ts`: [See jest docs](https://jestjs.io/docs/configuration)
3. Adjust `tsconfig.json`:
   - add `"jest.config.ts"` to `include` array
   - add block for ts-node ([see ts-node docs](https://github.com/TypeStrong/ts-node#via-tsconfigjson-recommended)):
     ```json
         "ts-node": {
             "transpileOnly": true,
             "files": true,
             "compilerOptions": {
                 "rootDir": ".",
             },
         },
     ```

#### Good to know: What's happening when running `yarn jest` in this setup

Jest:

- Searches for its [configuration](https://jestjs.io/docs/configuration)
- Optional: If a `jest.config.ts` is found, runs `ts-node` to JIT compile the configuration file (see section above)
- Uses `ts-jest` to transform `.ts` files to `.js`
  - "ts-jest is a [Jest transformer](https://jestjs.io/docs/code-transformation) with source map support that lets you use Jest to test projects written in TypeScript"
    - It supports all features of TypeScript including type-checking
    - advantage over @babel/preset-typescript: it solves [Babel's chaveats](https://devblogs.microsoft.com/typescript/typescript-and-babel-7/#caveats)
- Uses `vue-jest` to transform `.vue` (Single File Components) files
  - It transforms typescript script blocks within `.vue` to `.js`
- Searches for spec files
- Runs the tests

### Option B) Use vitest

TODO

## Setup linting and formatting

- Setup formatting with prettier:
  - Install prettier: `yarn add -D prettier`
  - Configure `.prettierrc.json` and `.prettierignore` (see [docs](https://prettier.io/docs/en/install.html) for more)
  - Add script `format` in `package.json`: `"prettier --write ."`
- Setup pre-commit hooks:
  - follow [these instructions](https://typicode.github.io/husky/#/?id=yarn-2) for husky
  - follow [these instructions](https://prettier.io/docs/en/install.html#git-hooks) for prettier
- Setup linting with ESLint:
  - Install ESLint: `yarn add -D eslint eslint-config-prettier eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser vue-eslint-parser`
  - Read [eslint-plugin-vue documentation](https://eslint.vuejs.org/user-guide/#installation) to learn how to configure ESLint with Typescript and Vue 3
  - Take a look at my `.eslintrc.js` (using `yarn create @eslint/config` required some manual tuning to work with Vue 3)
  - Add script in `package.json`: `eslint --ext .js,.ts,.vue --ignore-path .prettierignore .` (note: I reuse the exclusion rules for prettier to avoid file duplication)

## Setup VSCode

- Install [VSCode](https://code.visualstudio.com/)
- Install [ZipFS plugin](https://marketplace.visualstudio.com/items?itemName=arcanis.vscode-zipfs) to support files zipped by yarn
- Add Yarn support for VSCode: `yarn dlx @yarnpkg/sdks vscode`
- Install [Volar plugin](https://marketplace.visualstudio.com/items?itemName=Vue.volar) for Vue support
  - Use Workspaces version of Typescript for Volar via action "Volar: Select Typescript Version..."
- Install [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - Configure plugin as default code formatter in `.vscode/settings.json`: `"editor.defaultFormatter": "esbenp.prettier-vscode"`

## TODOs

- Transforming css/images in jest?
- ESM support for ts-node?
- Explain build steps
- https://class-component.vuejs.org/

## Current insufficiencies

- Remove `"skipLibCheck": true` in tsconfig.json once [this](https://github.com/johnsoncodehk/volar/issues/1114) and [this](https://github.com/vuejs/core/issues/1228) issue are resolved
