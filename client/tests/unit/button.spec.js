import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Loop/Button.vue';

describe('Button.vue', () => {
  it('renders button variant', () => {
    const variant = 'danger';
    const label = 'Send';
    const wrapper = shallowMount(Button, {
      propsData: { variant, label },
    });
    expect(wrapper.html()).toMatch(`<button type="button" data-oo-button="${variant}">${label}</button>`);
  });
});
