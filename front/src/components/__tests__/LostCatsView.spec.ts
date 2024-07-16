import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LostCatsView from '@/views/LostCatsView.vue'

describe('LostCatsView', () => {
  let wrapper: VueWrapper<InstanceType<typeof LostCatsView>>

  wrapper = mount(LostCatsView, {})

  describe('LostCatsView', () => {
    it('should display content when loading is false', async () => {
      const loading = wrapper.find('[data-unit-test="loading"]')
      expect(loading.exists()).toBe(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      const lostCatsList = wrapper.find('[data-unit-test="lost_cats_list"]')
      expect(lostCatsList.exists()).toBe(true)
      const loadingAfter = wrapper.find('[data-unit-test="loading"]')
      expect(loadingAfter.exists()).toBe(false)
    })
  })
})
