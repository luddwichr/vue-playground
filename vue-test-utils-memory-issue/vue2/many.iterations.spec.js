import { shallowMount } from "@vue/test-utils";
import DummyComponent from "./DummyComponent.vue";
import fs from "node:fs";

describe('running many tests', () => {
  const count = 5_000;
  let heap = [Array(count).fill(0)];
  let iterations = [...Array(count).keys()];
  let wrapper;

  afterAll(() => {
    iterations = null;
    fs.writeFileSync('test.log', "Heap Sizes in MB per iteration\n" + heap.join('\n'));
  });

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it.each(iterations)('Test %s', (i) => {
    wrapper = shallowMount(DummyComponent);
    heap[i] = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    expect(true).toBe(true);
  });
});