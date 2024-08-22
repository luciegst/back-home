import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, it, vi, type Mock } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '../../router/index'
import LoginView from '@/views/LoginView.vue'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia'
import { useNotificationStore } from '@/stores/notification'
import { logUser } from '@/services/apiUser'

vi.mock('@/services/apiUser', () => ({
  logUser: vi.fn()
}))

describe('LoginView', () => {
  let wrapper: VueWrapper<InstanceType<typeof LoginView>>
  let store: ReturnType<typeof useNotificationStore>

  const router = createRouter({
    history: createWebHistory(),
    routes: routes
  })

  const pinia = createTestingPinia({ createSpy: vi.fn })
  setActivePinia(pinia)
  store = useNotificationStore()

  wrapper = mount(LoginView, {
    global: {
      plugins: [router, pinia],
      stubs: {
        teleport: true,
        transition: true,
        asyncIcon: true
      }
    }
  })

  describe('LoginView', () => {
    describe('log in button', async () => {
      it('should not be disabled if email and password are filled correctly', async () => {
        const emailInput = wrapper.find('[data-unit-test="login_email"]')
        await emailInput.setValue('test@email.fr')
        await emailInput.trigger('keyup')
        const pwd = wrapper.find('[data-unit-test="login_pwd"]')
        await pwd.setValue('th3sIsAF%kePwd')
        await pwd.trigger('keyup')
        const LogUserBtn = wrapper.find('[data-unit-test="login_btn"]')
        expect(LogUserBtn.attributes('disabled')).toBeUndefined()
        expect(LogUserBtn.attributes('aria-disabled')).toBe('false')
      })
      it('should be disabled if email and password are not filled correctly', async () => {
        const emailInput = wrapper.find('[data-unit-test="login_email"]')
        await emailInput.setValue('')
        await emailInput.trigger('keyup')
        const pwd = wrapper.find('[data-unit-test="login_pwd"]')
        await pwd.setValue('')
        await pwd.trigger('keyup')
        const LogUserBtn = wrapper.find('[data-unit-test="login_btn"]')
        expect(LogUserBtn.attributes('disabled')).toBe('')
        expect(LogUserBtn.attributes('aria-disabled')).toBe('true')
      })
      it('should display notification success after request succeed', async () => {
        const LogUserBtn = wrapper.find('[data-unit-test="login_btn"]')
        await LogUserBtn.trigger('click')
        await store.$patch({ notificationStatus: true })
        await store.showNotification('Request succeed', 'IconSuccess', 'success')
        await store.$patch({
          notificationInfos: { text: 'Request succeed', icon: 'IconSuccess', type: 'success' }
        })
        await wrapper.vm.$nextTick()

        expect(store.showNotification).toHaveBeenCalled()
        const notification = wrapper.find('[data-unit-test="notification"]')
        expect(notification.exists()).toBe(true)
        expect(notification.attributes('class')).toContain('notif--success')
        const notificationIcon = wrapper.find('[data-unit-test="notif_icon"]')
        expect(notificationIcon.exists()).toBe(true)
        const notificationText = wrapper.find('[data-unit-test="notif_text"]')
        expect(notificationText.text()).toContain('Request succeed')
      })
      it('should display notification error after request failed', async () => {
        const LogUserBtn = wrapper.find('[data-unit-test="login_btn"]')
        await LogUserBtn.trigger('click')
        await store.$patch({ notificationStatus: true })
        await store.showNotification('Request failed', 'IconError', 'error')
        await store.$patch({
          notificationInfos: { text: 'Request failed', icon: 'IconError', type: 'error' }
        })
        await wrapper.vm.$nextTick()

        expect(store.showNotification).toHaveBeenCalled()
        const notification = wrapper.find('[data-unit-test="notification"]')
        expect(notification.exists()).toBe(true)
        expect(notification.attributes('class')).toContain('notif--error')
        const notificationIcon = wrapper.find('[data-unit-test="notif_icon"]')
        expect(notificationIcon.exists()).toBe(true)
        const notificationText = wrapper.find('[data-unit-test="notif_text"]')
        expect(notificationText.text()).toContain('Request failed')
      })
    })
    describe('login errors', () => {
      it('should have an email error message if user not found in database', async () => {
        const mockedAxiosPost = logUser as Mock

        mockedAxiosPost.mockRejectedValueOnce({
          isAxiosError: true,
          response: {
            data: {
              error: {
                code: 'user_not_found',
                message: 'user not found'
              }
            }
          }
        })

        const emailInput = wrapper.find('[data-unit-test="login_email"]')
        await emailInput.setValue('user@dontexist.fr')
        const pwd = wrapper.find('[data-unit-test="login_pwd"]')
        await pwd.setValue('th3sIsAF%kePwd')
        const LogUserBtn = wrapper.find('[data-unit-test="login_btn"]')
        await LogUserBtn.trigger('click')
        await wrapper.vm.$nextTick()
        const emailErrorMessage = wrapper.find('[data-unit-test="login_email_error"]')
        expect(emailErrorMessage.exists()).toBe(true)
      })
      it('should have a password error message if password is not correct', async () => {
        const mockedAxiosPost = logUser as Mock

        mockedAxiosPost.mockRejectedValueOnce({
          isAxiosError: true,
          response: {
            data: {
              error: {
                code: 'wrong_password',
                message: 'wrong_password'
              }
            }
          }
        })

        const emailInput = wrapper.find('[data-unit-test="login_email"]')
        await emailInput.setValue('user@exist.fr')
        const pwd = wrapper.find('[data-unit-test="login_pwd"]')
        await pwd.setValue('th3sIsAF%kePwd')
        const LogUserBtn = wrapper.find('[data-unit-test="login_btn"]')
        await LogUserBtn.trigger('click')
        await wrapper.vm.$nextTick()
        const pwdErrorMessage = wrapper.find('[data-unit-test="login_pwd_error"]')
        expect(pwdErrorMessage.exists()).toBe(true)
      })
    })
  })
})
