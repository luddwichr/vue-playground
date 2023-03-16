# Yarn 3 + Vue 3 + Typescript + Vite + Vitest + VS Code + ESLint + Prettier

## Setup project with Yarn, Typescript, Vite and Vue

- Install yarn (globally): `npm install yarn --global`
- Initialize vite project: `yarn create vite <PROJECT_NAME> --template vue-ts`
- Go to project folder: `cd <PROJECT_NAME>`
- Configure yarn version: `yarn set version stable`
- Install dependencies: `yarn install`
- Install `yarn plugin import interactive-tools` (see [here](https://yarnpkg.com/api/modules/plugin_interactive_tools.html) for more)
- Add some yarn support for Typescript: `yarn plugin import typescript` (see [here](https://yarnpkg.com/api/modules/plugin_typescript.html) for more)

### How to update dependencies

- Update dependencies defined in `package.json`: `yarn upgrade-interactive`
- Update yarn: `yarn set version stable`
- Update yarn SDKs: `yarn dlx @yarnpkg/sdks`

## Setup Test runner (vitest)

- Install dependencies: `yarn add -D vitest @vue/test-utils jsdom @types/jest`
- Add entry `"test": "vitest"` to `scripts` section of `package.json`
- Adjust `vite.config.ts`: add `/// <reference types="vitest" />`to top of file, and add the following section in the config object:
  ```js
  test: {
        globals: true,
        environment: "jsdom"
  }
  ```

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
- Install [Volar plugin](https://marketplace.visualstudio.com/items?itemName=Vue.volar) for Vue support (**CAUTION:** the old plugin "johnsoncodehk.Volar" does not work in this setup!)
  - **IMPORTANT**: Ensure that Volar uses Workspaces version of Typescript for Volar via action "Volar: Select Typescript Version..."
- Install [Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - Configure plugin as default code formatter in `.vscode/settings.json`: `"editor.defaultFormatter": "esbenp.prettier-vscode"`
- Install plugin ["Vitest plugin"](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer)

  - **IMPORTANT**: [Blocking issue](https://github.com/vitest-dev/vscode/issues/137)