import { mount } from '@vue/test-utils'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useDeviceStore } from '@/stores/device'
import NavBar from '../NavBar.vue'
import { setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '../../router/index'

describe('NavBar', () => {
  let wrapper: ReturnType<typeof mount>
  let store: ReturnType<typeof useDeviceStore>

  const router = createRouter({
    history: createWebHistory(),
    routes: routes
  })

  beforeEach(async () => {
    const pinia = createTestingPinia({ createSpy: vi.fn })
    setActivePinia(pinia)
    store = useDeviceStore()

    router.push('/')
    // After this line, router is ready
    await router.isReady()

    wrapper = mount(NavBar, {
      global: {
        plugins: [pinia, router]
      }
    })
  })

  describe('when deviceType is mobile', () => {
    it('should have mobile logo', async () => {
      store.$patch({ deviceType: 'mobile' })
      await wrapper.vm.$nextTick()
      const logo = wrapper.find('[data-unit-test="mobile_logo"]')
      expect(logo.exists()).toBe(true)
    })

    it('should have mobile menu btn', async () => {
      store.$patch({ deviceType: 'mobile' })
      await wrapper.vm.$nextTick()
      const mobileMenuBtn = wrapper.find('[data-unit-test="mobile_menu_btn"]')
      expect(mobileMenuBtn.exists()).toBe(true)
    })
  })

  describe('when deviceType is Tablet/Desktop', () => {
    it('should have desktop logo', async () => {
      store.$patch({ deviceType: 'desktop' })
      await wrapper.vm.$nextTick()
      const logo = wrapper.find('[data-unit-test="desktop_logo"]')
      expect(logo.exists()).toBe(true)
    })

    it('should have pen icon in add page btn', async () => {
      store.$patch({ deviceType: 'desktop' })
      await wrapper.vm.$nextTick()
      const pencilIcon = wrapper.find('[data-unit-test="desktop_pen_icon"]')
      expect(pencilIcon.exists()).toBe(true)
    })

    it('should have desktop submenu', async () => {
      store.$patch({ deviceType: 'desktop' })
      await wrapper.vm.$nextTick()
      const logo = wrapper.find('[data-unit-test="desktop_submenu"]')
      expect(logo.exists()).toBe(true)
    })
  })
})
