import { describe, expect, it } from 'vitest'

import MapTable from '../MapTable.vue'
import { shallowMount } from '@vue/test-utils'

describe('MapTable.vue Test', () => {
  const mockLocation = {
    lat: 43.74833,
    long: -79.2892,
    formatted_address: '22 Howden Rd, Scarborough, ON M1R 3E4, Canada'
  }
  it('removes a single location, returning an empty list', async () => {
    const wrapper = shallowMount(MapTable, {
      propsData: {
        parentLocations: [mockLocation]
      }
    })
    await wrapper.setData({ selectedRows: [mockLocation] })

    wrapper.find('button').trigger('click')

    expect(wrapper.emitted('delete-locations')).toEqual([[[]]])
  })

  it('removes no locations, return a single location', async () => {
    const wrapper = shallowMount(MapTable, {
      propsData: {
        parentLocations: [mockLocation]
      }
    })
    wrapper.find('button').trigger('click')

    expect(wrapper.emitted('delete-locations')).toEqual([[[mockLocation]]])
  })
})
