import { describe, expect, it } from 'vitest'

import GeolocationButton from '../GeolocationButton.vue'
import { shallowMount } from '@vue/test-utils'

describe('GeolocationButton.vue Test', () => {
  it('fails location service permissions and returns an error message', async () => {
    const wrapper = shallowMount(GeolocationButton)

    wrapper.find('button').trigger('click')

    expect(wrapper.emitted('error')).toEqual([['Please enable location services']])
  })
})
