import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Banner from '../ui/Banner.vue'

describe('Banner', () => {
  let wrapper: VueWrapper<InstanceType<typeof Banner>>

  wrapper = mount(Banner, {
    props: {
      title: 'page title',
      dataCY: 'default or DataCY'
    }
  })

  describe('Banner props', () => {
    it('should have title props', () => {
      expect(wrapper.props().title).toBeTypeOf('string')
    })
    it('should have dataCY props', () => {
      expect(wrapper.props().dataCY).toBeTypeOf('string')
    })
  })
})
