import { describe, expect, it } from 'vitest'

import NavBar from '../NavBar.vue'
import { shallowMount } from '@vue/test-utils'

describe('NavBar.vue Test', () => {
  const mockLocation = {
    lat: 43.74833,
    long: -79.2892,
    formatted_address: '22 Howden Rd, Scarborough, ON M1R 3E4, Canada'
  }

  it('searches mock location and returns a location object', async () => {
    const wrapper = shallowMount(NavBar)
    const input = wrapper.find('input').element

    input.value = mockLocation.formatted_address

    wrapper.vm.autocomplete = new google.maps.places.Autocomplete(input)

    wrapper.find('button').trigger('click')

    expect(wrapper.emitted('add-location')).toEqual([mockLocation])
  })
})
