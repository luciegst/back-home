import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '../../router/index'
import MobileDropdownMenu from '../MobileDropdownMenu.vue'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia'
import { useDeviceStore } from '@/stores/device'

describe('MobileDropdownMenu', () => {
  let wrapper: VueWrapper<InstanceType<typeof MobileDropdownMenu>>
  let store: ReturnType<typeof useDeviceStore>

  const pinia = createTestingPinia({ createSpy: vi.fn })
  setActivePinia(pinia)
  store = useDeviceStore()

  const router = createRouter({
    history: createWebHistory(),
    routes: routes
  })

  wrapper = mount(MobileDropdownMenu, {
    global: {
      plugins: [router, pinia],
      stubs: {
        teleport: true
      }
    },
    props: {
      visible: true,
      id: 'modal id'
    }
  })

  describe('Props', () => {
    it('should have visible props', () => {
      expect(wrapper.props().visible).toBeTypeOf('boolean')
    })
    it('should have id props', () => {
      expect(wrapper.props().id).toBeTypeOf('string')
    })
  })
  describe('links', () => {
    it('should emit close modal', async () => {
      const dogsLink = wrapper.find('[data-unit-test="link_dogs"]')
      const catsLink = wrapper.find('[data-unit-test="link_cats"]')
      await dogsLink.trigger('click')
      await catsLink.trigger('click')
      expect(wrapper.emitted()).toHaveProperty('close-modal')
    })
    it('should go to correct associate pages', () => {
      const dogsLink = wrapper.find('[data-unit-test="link_dogs"]')
      const catsLink = wrapper.find('[data-unit-test="link_cats"]')
      expect(dogsLink.text()).toBe('Chiens perdus')
      expect(dogsLink.attributes('href')).toBe('/lost/dogs')
      expect(catsLink.text()).toBe('Chats perdus')
      expect(catsLink.attributes('href')).toBe('/lost/cats')
    })
  })
})
