import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useDeviceStore } from '@/stores/device'
import NavBar from '../NavBar.vue'
import { setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '../../router/index'

describe('NavBar', () => {
  let wrapper: VueWrapper<InstanceType<typeof NavBar>>
  let store: ReturnType<typeof useDeviceStore>

  const router = createRouter({
    history: createWebHistory(),
    routes: routes
  })

  const pinia = createTestingPinia({ createSpy: vi.fn })
  setActivePinia(pinia)
  store = useDeviceStore()

  router.push('/')
  router.isReady()
  router.push = vi.fn()

  wrapper = mount(NavBar, {
    global: {
      plugins: [pinia, router],
      stubs: {
        teleport: true
      }
    }
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

  describe('routes', () => {
    it('ad page btn should open ad page', async () => {
      const addPageBtn = wrapper.find('[data-unit-test="go_ad_page_btn"]')
      await addPageBtn.trigger('click')
      expect(router.push).toHaveBeenCalledWith({ name: 'ad.page' })
    })
    it('mobile_menu_btn should open submenu modal', async () => {
      store.$patch({ deviceType: 'mobile' })
      await wrapper.vm.$nextTick()
      const mobileMenuBtn = wrapper.find('[data-unit-test="mobile_menu_btn"]')
      await mobileMenuBtn.trigger('click')
      const dropdownMobileBtn = wrapper.find('[data-unit-test="mobile_dropdown_menu"]')
      expect(dropdownMobileBtn.exists()).toBe(true)
    })
    it('dogs link should go to lost dogs page', async () => {
      store.$patch({ deviceType: 'desktop' })
      await wrapper.vm.$nextTick()
      const dogsLink = wrapper.find('[data-unit-test="lost_dogs_link"]')
      expect(dogsLink.text()).toBe('Chiens perdus')
      expect(dogsLink.attributes('href')).toBe('/lost/dogs')
    })
    it('cats link should go to lost cats page', async () => {
      store.$patch({ deviceType: 'desktop' })
      await wrapper.vm.$nextTick()
      const catsLink = wrapper.find('[data-unit-test="lost_cats_link"]')
      expect(catsLink.text()).toBe('Chats perdus')
      expect(catsLink.attributes('href')).toBe('/lost/cats')
    })
    it('home link should go to home page', async () => {
      const homeLink = wrapper.find('[data-unit-test="home_link"]')
      expect(homeLink.attributes('href')).toBe('/')
    })
    it('user logo link should go to account page', async () => {
      const accountLink = wrapper.find('[data-unit-test="account_link"]')
      expect(accountLink.attributes('href')).toBe('/account')
    })
  })
})
