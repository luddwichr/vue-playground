# Yarn 3 + Vue 3 + Typescript + Vite + Jest + VS Code + ESLint + Prettier

## Setup steps

- Install yarn (globally): `npm install yarn --global`
- Configure yarn version: `yarn set version stable`
- Install `yarn plugin import interactive-tools` to conveniently update dependencies via `yarn upgrade-interactive`
- Initialize vite project: `yarn create vite` and select `vue-tsc` when prompted
- Add some yarn support for Typescript: `yarn plugin import typescript` (see [here](https://yarnpkg.com/api/modules/plugin_typescript.html) for more)
- Setup jest as test runner:
  - Install dependencies: `yarn add -D jest @types/jest ts-jest` (see [Jest docs](https://jestjs.io/docs/getting-started#using-typescript-via-ts-jest) for more)
  - Add `"test": "jest"` to `scripts` section of `package.json`
  - Create Jest configuration file `jest.config.js`:
    ```js
    /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
    module.exports = {
      testEnvironment: 'jsdom', // we use jsdom instead of node since we test DOM stuff
      clearMocks: true, // convenience feature to ensure mocks are always cleared after each test
      transform: {
        '^.+\\.ts$': 'ts-jest' // use ts-jest to transform .ts files to .js
      }
    };
    ```
    Note: this setup is a bit different than `yarn ts-jest config:init` (e.g `transform` is used instead of `preset`)
- Setup testing for Vue:
  - Install dependencies: `@vue/test-utils @vue/vue3-jest @babel/core babel-jest @vue/compiler-sfc @vue/compiler-dom`
  - Configure processing Single-File Components in `jest.config.js`:
    ```js
        moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
        transform: {
            "^.+\\.vue$": "@vue/vue3-jest",
            ...
        },
    ```
- Setup formatting with prettier:
  - Install prettier: `yarn add -D prettier`
  - Configure `.prettierrc.json` and `.prettierignore` (see [docs](https://prettier.io/docs/en/install.html) for more)
  - Add script in `package.json`: `"prettier --write ."`
- Setup pre-commit hooks: 
    - follow [these instructions](https://typicode.github.io/husky/#/?id=install-1) for husky
    - follow [these instructions](https://prettier.io/docs/en/install.html#git-hooks) for prettier
- Setup linting with ESLint:
  - Install ESLint: `yarn add -D eslint eslint-config-prettier eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser vue-eslint-parser`
  - Read [eslint-plugin-vue documentation](https://eslint.vuejs.org/user-guide/#installation) to learn how to configure ESLint with Typescript and Vue 3
  - Take a look at my `.eslintrc.js` (using `yarn create @eslint/config` required some manual tuning to work with Vue 3)
  - Add script in `package.json`: `eslint --ext .js,.ts,.vue --ignore-path .prettierignore .` (note: I reuse the exclusion rules for prettier to avoid file duplication)

### VSCode Setup

- Install [VSCode](https://code.visualstudio.com/)
- Install [ZipFS plugin](https://marketplace.visualstudio.com/items?itemName=arcanis.vscode-zipfs) to support files zipped by yarn
- Add Yarn support for VSCode: `yarn dlx @yarnpkg/sdks vscode`
- [Use Workspaces version of Typescript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript)
- Install [Volar plugin](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) for Vue support
  - Use Workspaces version of Typescript for Volar via action "Volar: Select Typescript Version..."
- Install [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin)
  - [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471) is not compatible with Yarn PnP!
- Install [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - Configure plugin as default code formatter in `.vscode/settings.json`: `"editor.defaultFormatter": "esbenp.prettier-vscode"`

### A note on using jest.config.ts

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

## What's happening when running `yarn jest` in my current setup

Jest:

- Searches for its [configuration](https://jestjs.io/docs/configuration)
- Optional: If a `jest.config.ts` is found, runs `ts-node` to JIT compile the configuration file
- Uses `ts-jest` to transform `.ts` files to `.js`
  - "ts-jest is a [Jest transformer](https://jestjs.io/docs/code-transformation) with source map support that lets you use Jest to test projects written in TypeScript"
    - It supports all features of TypeScript including type-checking
    - advantage over @babel/preset-typescript: it solves [Babel's chaveats](https://devblogs.microsoft.com/typescript/typescript-and-babel-7/#caveats)
  - Hence, `ts-jest` transforms the `.ts` files to `.js` files
- Uses `vue-jest` to transform `.vue` (Single File Components) files
  - It transforms typescript script blocks within `.vue` to `.js`
- Searches for spec files
- Runs the tests

## What happens when running `yarn build` in my current setup

- vue-tsc
- vite

## TODOs

- Transforming css/images in jest?
- ESM support for ts-node?
- Explain build steps
- https://class-component.vuejs.org/

## Notes

- `@vue/test-utils@next` and `@vue/vue3-jest` are still in RC / Alpha mode and are not considered production ready

## Current workarounds

- Remove `"skipLibCheck": true` in tsconfig.json once https://github.com/johnsoncodehk/volar/issues/1114 is resolved
