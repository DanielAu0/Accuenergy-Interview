import { describe, expect, it } from 'vitest'

import TimeDisplay from '../TimeDisplay.vue'
import { shallowMount } from '@vue/test-utils'

describe('TimeDisplay.vue Test', () => {
  it('renders message when component is created', () => {
    const wrapper = shallowMount(TimeDisplay, {
      propsData: {
        parentLocations: []
      }
    })

    expect(wrapper.text()).toMatch('Local time of the latest searched location:')
  })
})