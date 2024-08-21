<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Banner from '@/components/ui/Banner.vue'
import { logUser } from '@/services/apiUser'
import { useNotificationStore } from '@/stores/notification'
import Notification from '@/components/ui/Notification.vue'
import axios from 'axios'

const notificationStore = useNotificationStore()
const router = useRouter()

const loginPart = ref<HTMLInputElement | null>(null)
const passwordType = ref<string>('password')
const password = ref<string>('')
const email = ref<string>('')
const notificationInfos = ref<{
  type: string
  text: string
  icon: string
}>(notificationStore.notificationInfos)
const hasNoAccount = ref<boolean>(false)
const hasPasswordError = ref<boolean>(false)

const showPassword = () => {
  passwordType.value = 'text'
}

const hidePassword = () => {
  passwordType.value = 'password'
}

const goToCreateAccount = () => {
  router.push({ name: 'account.register' })
}

const formIsValid = () => {
  return password.value && email.value
}

const resetFormValues = () => {
  ;(email.value = ''), (password.value = '')
}

const resetPasswordError = () => {
  hasPasswordError.value = false
}

const resetEmailError = () => {
  hasNoAccount.value = false
}

const submitLoginForm = async () => {
  const params = {
    email: email.value,
    password: password.value
  }
  try {
    await logUser(params)
    resetFormValues()
    setTimeout(() => {
      router.push({ name: 'home' })
    }, 2000)
  } catch (e: unknown) {
    notificationStore.showNotification('Une erreur est survenue.', 'IconError', 'error')
    if (axios.isAxiosError(e) && e.response) {
      const apiError = e.response.data.error
      if (apiError.code === 'user_not_found') {
        hasNoAccount.value = true
      }
      if (apiError.code === 'wrong_password') {
        hasPasswordError.value = true
      }
    }
    console.error('Login error')
  }
}

onMounted(() => {
  if (loginPart.value) {
    loginPart.value.focus()
  }
})
</script>

<template>
  <div>
    <Banner :title="'Connexion'" />
    <div ref="loginPart" tabindex="-1" class="w-full flex justify-center px-14 py-14">
      <div class="w-[26rem]">
        <form aria-label="Formulaire de connexion" @submit.prevent>
          <fieldset class="flex flex-col gap-3">
            <label class="ryman-eco text-dark-blue font-bold" for="email"> COURRIEL </label>
            <input
              class="border border-1 px-2 py-2.5"
              v-model="email"
              type="text"
              id="email"
              aria-required="true"
              required
              data-unit-test="login_email"
              @keyup="resetEmailError"
            />
            <p
              role="alert"
              v-if="hasNoAccount"
              id="email-error"
              class="text-red"
              data-unit-test="login_email_error"
              data-cy="login_email_error"
            >
              Pas de compte associé à cette adresse email. Veuillez créer votre compte.
            </p>
            <label class="ryman-eco text-dark-blue font-bold" for="password"> MOT DE PASSE </label>
            <div class="border border-1 px-2 py-2.5 flex" :class="{ error: hasPasswordError }">
              <input
                class="w-full"
                v-model="password"
                :type="passwordType"
                id="password"
                aria-required="true"
                required
                data-unit-test="login_pwd"
                @keyup="resetPasswordError"
              />
              <button
                v-if="passwordType === 'password'"
                aria-label="Afficher le mot de passe"
                @click="showPassword"
              >
                Afficher
              </button>
              <button v-else aria-label="Masquer le mot de passe" @click="hidePassword">
                Masquer
              </button>
            </div>
            <p
              role="alert"
              v-if="hasPasswordError"
              id="password-error"
              class="text-red"
              data-unit-test="login_pwd_error"
            >
              Erreur de mot de passe.
            </p>

            <button
              class="px-2 py-2.5 bg-dark-green mt-3 font-bold"
              type="submit"
              :disabled="!formIsValid()"
              :aria-disabled="!formIsValid()"
              :class="{ disabled: !formIsValid() }"
              data-unit-test="login_btn"
              @click="submitLoginForm()"
            >
              Se connecter
            </button>
          </fieldset>
        </form>
        <div class="mt-12 flex flex-col gap-1">
          <!-- TODO: lost password in a next US -->
          <!-- <button class="underline text-left font-bold">Mot de passe oublié ?</button> -->
          <button class="underline text-left font-bold" @click="goToCreateAccount">
            Créer un compte
          </button>
        </div>
        <Notification
          :icon="notificationInfos.icon"
          :type="notificationInfos.type"
          :text="notificationInfos.text"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.disabled {
  background-color: theme('colors.light-grey');
}
.error {
  border: 2px solid theme('colors.red');
}
</style>
