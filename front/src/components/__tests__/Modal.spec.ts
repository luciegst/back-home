import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Modal from '../ui/Modal.vue'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia'
import { useDeviceStore } from '@/stores/device'

describe('HomeCard', () => {
  let wrapper: VueWrapper<InstanceType<typeof Modal>>
  let store: ReturnType<typeof useDeviceStore>

  const pinia = createTestingPinia({ createSpy: vi.fn })
  setActivePinia(pinia)
  store = useDeviceStore()

  wrapper = mount(Modal, {
    global: {
      plugins: [pinia],
      stubs: {
        teleport: true
      }
    },
    props: {
      modelValue: true,
      margin: 'auto',
      width: '100%',
      ariaLabelledby: 'modal label'
    }
  })

  describe('Modal props', () => {
    it('should have modelValue props', () => {
      expect(wrapper.props().modelValue).toBeTypeOf('boolean')
    })
    it('should have margin props', () => {
      expect(wrapper.props().margin).toBeTypeOf('string')
    })
    it('should have width props', () => {
      expect(wrapper.props().width).toBeTypeOf('string')
    })
    it('should have ariaLabelledby props', () => {
      expect(wrapper.props().ariaLabelledby).toBeTypeOf('string')
    })
  })

  describe('Button close modal', () => {
    it('should close modal', async () => {
      const cancelButton = wrapper.find('[data-unit-test="btn_close_modal"]')
      await cancelButton.trigger('click')
      expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    })
  })

  describe('Teleport disabled props on mobile', () => {
    it('should be true on mobile', async () => {
      store.$patch({ deviceType: 'mobile' })
      await wrapper.vm.$nextTick()
      const teleport = wrapper.find('[data-unit-test="teleport"]')
      expect(teleport.attributes('disabled')).toBe('true')
    })
    it('should be false on desktop/tablet', async () => {
      store.$patch({ deviceType: 'desktop' })
      await wrapper.vm.$nextTick()
      const teleport = wrapper.find('[data-unit-test="teleport"]')
      expect(teleport.attributes('disabled')).toBe('false')
    })
  })
})
