import { shallowMount } from "@vue/test-utils";
import DummyComponent from "./DummyComponent.vue";
import fs from "node:fs";

describe('mount and destroy components endlessly', () => {
  it('should not run out of memory', () => {
    const wrapper = shallowMount(DummyComponent);
    wrapper.destroy();
  });
});
