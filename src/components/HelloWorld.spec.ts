import { shallowMount, VueWrapper } from '@vue/test-utils';
import HelloWorld from './HelloWorld.vue';

describe('HelloWorld', () => {
    let wrapper: VueWrapper;
    it('shows a message in a header', () => {    
        createComponent('Test message');
        expect(findHeader().text()).toBe('Test message');
    });

    it('starts with a count of 0', () => {
        createComponent();
        expect(findCounter().text()).toBe('Count: 0');
    });

    it('increases counter to 1 after button click', async () => {
        createComponent();
        await findButton().trigger('click');
        await wrapper.vm.$nextTick();
        expect(findCounter().text()).toContain('Count: 1');
    });

    function createComponent(msg: string = '') {
        wrapper = shallowMount(HelloWorld, {props: {msg}});
    }

    function findButton() {
        return wrapper.find('button');
    }

    function findHeader() {
        return wrapper.find('h1');
    }

    function findCounter() {
        return wrapper.find('span');
    }
});