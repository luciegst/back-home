import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '../../router/index'
import RegisterView from '@/views/RegisterView.vue'

describe('LostCatsView', () => {
  let wrapper: VueWrapper<InstanceType<typeof RegisterView>>

  const router = createRouter({
    history: createWebHistory(),
    routes: routes
  })

  wrapper = mount(RegisterView, {
    global: {
      plugins: [router]
    }
  })

  describe('RegisterView', () => {
    describe('email part', () => {
      it('should display email error message if email doesnt have correct format', async () => {
        const emailInput = wrapper.find('[data-unit-test="email"]')
        await emailInput.setValue('Hello')
        await emailInput.trigger('keyup')
        await emailInput.trigger('blur')
        const emailError = wrapper.find('[data-unit-test="email_error"]')
        expect(emailError.exists()).toBe(true)
      })
      it('should display email error message if email doesnt have correct format', async () => {
        const emailInput = wrapper.find('[data-unit-test="email"]')
        await emailInput.setValue('Hello.fr')
        await emailInput.trigger('keyup')
        await emailInput.trigger('blur')
        const emailError = wrapper.find('[data-unit-test="email_error"]')
        expect(emailError.exists()).toBe(true)
      })
      it('should not display email error message if email has correct format', async () => {
        const emailInput = wrapper.find('[data-unit-test="email"]')
        await emailInput.setValue('test@email.fr')
        await emailInput.trigger('keyup')
        await emailInput.trigger('blur')
        const emailError = wrapper.find('[data-unit-test="email_error"]')
        expect(emailError.exists()).toBe(false)
      })
    })
    describe('password part', () => {
      it('should display password if user click on the display pwd btn', async () => {
        const passwordDisplayBtn = wrapper.find('[data-unit-test="display_pwd"]')
        await passwordDisplayBtn.trigger('click')
        const pwd = wrapper.find('[data-unit-test="pwd"]')
        expect(pwd.attributes('type')).toBe('text')
      })
      it('should hide password if user click on the hide pwd btn', async () => {
        const passwordHideBtn = wrapper.find('[data-unit-test="hide_pwd"]')
        await passwordHideBtn.trigger('click')
        const pwd = wrapper.find('[data-unit-test="pwd"]')
        expect(pwd.attributes('type')).toBe('password')
      })
      it('should valid min length pattern in list', async () => {
        const pwd = wrapper.find('[data-unit-test="pwd"]')
        await pwd.setValue('testminlength12')
        await pwd.trigger('keyup')
        await pwd.trigger('blur')
        const pwdMinLength = wrapper.find('[data-unit-test="pwd_min_length"]')
        expect(pwdMinLength.attributes('class')).toBe('valid')
      })
      it('should valid uppercase pattern in list', async () => {
        const pwd = wrapper.find('[data-unit-test="pwd"]')
        await pwd.setValue('UUU')
        await pwd.trigger('keyup')
        await pwd.trigger('blur')
        const pwdUppercase = wrapper.find('[data-unit-test="pwd_uppercase"]')
        expect(pwdUppercase.attributes('class')).toBe('valid')
      })
      it('should valid lowercase pattern in list', async () => {
        const pwd = wrapper.find('[data-unit-test="pwd"]')
        await pwd.setValue('jjj')
        await pwd.trigger('keyup')
        await pwd.trigger('blur')
        const pwdLowercase = wrapper.find('[data-unit-test="pwd_lowercase"]')
        expect(pwdLowercase.attributes('class')).toBe('valid')
      })
      it('should valid digit pattern in list', async () => {
        const pwd = wrapper.find('[data-unit-test="pwd"]')
        await pwd.setValue('jj6h')
        await pwd.trigger('keyup')
        await pwd.trigger('blur')
        const pwdDigit = wrapper.find('[data-unit-test="pwd_digit"]')
        expect(pwdDigit.attributes('class')).toBe('valid')
      })
      it('should valid special char pattern in list', async () => {
        const pwd = wrapper.find('[data-unit-test="pwd"]')
        await pwd.setValue('jj6h!')
        await pwd.trigger('keyup')
        await pwd.trigger('blur')
        const pwdSpecialChar = wrapper.find('[data-unit-test="pwd_special_char"]')
        expect(pwdSpecialChar.attributes('class')).toBe('valid')
      })
      it('should display pwd error message if pwd doesnt have correct format', async () => {
        const pwd = wrapper.find('[data-unit-test="pwd"]')
        await pwd.setValue('thisIsAFakePwd')
        await pwd.trigger('keyup')
        await pwd.trigger('blur')
        const pwdError = wrapper.find('[data-unit-test="pwd_error"]')
        expect(pwdError.exists()).toBe(true)
      })
      it('should not display pwd error message if pwd has correct format', async () => {
        const pwd = wrapper.find('[data-unit-test="pwd"]')
        await pwd.setValue('th3sIsAF%kePwd')
        await pwd.trigger('keyup')
        await pwd.trigger('blur')
        const pwdError = wrapper.find('[data-unit-test="pwd_error"]')
        expect(pwdError.exists()).toBe(false)
      })
    })
    describe('create button', async () => {
      it('should not be disabled if email and password are filled correctly', async () => {
        const emailInput = wrapper.find('[data-unit-test="email"]')
        await emailInput.setValue('test@email.fr')
        await emailInput.trigger('keyup')
        const pwd = wrapper.find('[data-unit-test="pwd"]')
        await pwd.setValue('th3sIsAF%kePwd')
        await pwd.trigger('keyup')
        const createUserBtn = wrapper.find('[data-unit-test="create_user_btn"]')
        expect(createUserBtn.attributes('disabled')).toBeUndefined()
        expect(createUserBtn.attributes('aria-disabled')).toBe('false')
      })
      it('should be disabled in other cases', async () => {
        const emailInput = wrapper.find('[data-unit-test="email"]')
        await emailInput.setValue('test.fr')
        await emailInput.trigger('keyup')
        const pwd = wrapper.find('[data-unit-test="pwd"]')
        await pwd.setValue('F%kePwd')
        await pwd.trigger('keyup')
        const createUserBtn = wrapper.find('[data-unit-test="create_user_btn"]')
        expect(createUserBtn.attributes('disabled')).toBe('')
        expect(createUserBtn.attributes('aria-disabled')).toBe('true')
      })
    })
  })
})
