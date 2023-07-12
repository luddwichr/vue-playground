import { shallowMount } from "@vue/test-utils";
import DummyComponent from "./DummyComponent.vue";

describe('mount and destroy components endlessly', () => {
  it('should not run out of memory', () => {
    while(true) {
      const wrapper = shallowMount(DummyComponent);
      wrapper.destroy();
    }
  });
});
