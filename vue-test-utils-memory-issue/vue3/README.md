# Reproduce and analyze memory leak when using Vue 3 + jest + vue-test-utils

See https://github.com/vuejs/vue-test-utils/issues/2041 for what the problem is.

## Reproduce issue

Install dependencies:

- `npm install`

Run tests with memory limit 200 MB (so that GC is forced to kick in):

- `node --max-old-space-size=200 ./node_modules/jest/bin/jest.js endless.loop.spec.js`

**=> not reproducible for Vue 3 + Vue Test Utils 2**