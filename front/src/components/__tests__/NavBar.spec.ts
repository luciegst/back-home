import { shallowMount } from '@vue/test-utils'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useDeviceStore } from '@/stores/device'
import NavBar from '../NavBar.vue'
import { setActivePinia } from 'pinia'

describe('NavBar', () => {
  let wrapper: ReturnType<typeof shallowMount>
  let store: ReturnType<typeof useDeviceStore>

  beforeEach(() => {
    const pinia = createTestingPinia({ createSpy: vi.fn })
    setActivePinia(pinia)
    store = useDeviceStore()

    wrapper = shallowMount(NavBar, {
      global: {
        plugins: [pinia]
      }
    })
  })

  it('should have mobile logo when deviceType is mobile', async () => {
    store.$patch({ deviceType: 'mobile' })
    await wrapper.vm.$nextTick()
    const logo = wrapper.find('[data-unit-test="mobile_logo"]')
    expect(logo.exists()).toBe(true)
  })

  it('should have desktop logo when deviceType is desktop', async () => {
    store.$patch({ deviceType: 'desktop' })
    await wrapper.vm.$nextTick()
    const logo = wrapper.find('[data-unit-test="desktop_logo"]')
    expect(logo.exists()).toBe(true)
  })
})
