import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import App from '../App.vue';

// TODO
describe.skip('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App);
    expect(wrapper.text()).toContain('You did it!');
  });
});
