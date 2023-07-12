# Reproduce and analyze memory leak when using Vue2 + jest + vue-test-utils

See https://github.com/vuejs/vue-test-utils/issues/2041 for what the problem is.

## Reproduce issue

Install dependencies:

- `npm install`

Run tests with memory limit 200 MB (so that GC is forced to kick in):

- `node --max-old-space-size=200 ./node_modules/jest/bin/jest.js endless.loop.spec.js`

## Analysis

If you want to log how the heap grows (without memory limit) to output file `test.log`:

- `node ./node_modules/jest/bin/jest.js many.iterations.spec.js`

### Diagnostics using a Debugger

- read https://jestjs.io/docs/troubleshooting
- run `node --inspect-brk ./node_modules/jest/bin/jest.js many.iterations.spec.js --runInBand`

## Articles that might help

- https://nodejs.org/en/docs/guides/diagnostics/memory/using-heap-profiler