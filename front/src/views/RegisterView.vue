<script setup lang="ts">
import { ref, computed } from 'vue'
import Banner from '@/components/ui/Banner.vue'
import { createUser } from '@/services/apiUser'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const passwordType = ref<string>('password')
const password = ref<string>('')
const email = ref<string>('')
const firstName = ref<string>('')
const lastName = ref<string>('')
const emailError = ref<string>('')
const patternPassword = ref<RegExp>(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{12,}$/)
const patternEmail = ref<RegExp>(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)

const patternUpperCase = ref<RegExp>(/(?=.*[A-Z])/)
const patternLowerCase = ref<RegExp>(/(?=.*[a-z])/)
const patternOneDigit = ref<RegExp>(/(?=.*[0-9])/)
const patternOneSpecialChar = ref<RegExp>(/(?=.*\W)/)
const patternNbCharacter = ref<RegExp>(/.{12,}/)

const hasUpperCase = ref<boolean>(false)
const hasLowerCase = ref<boolean>(false)
const hasOneDigit = ref<boolean>(false)
const hasSpecialChar = ref<boolean>(false)
const hasMinLength = ref<boolean>(false)
const hasCorrectEmail = ref<boolean>(false)
const hasEmailError = ref<boolean>(false)
const hasPasswordError = ref<boolean>(false)

const hasValidEmail = computed(() => hasCorrectEmail.value)
const patternPasswordString = computed(() => patternPassword.value.source)

const formIsValid = () => {
  return hasValidPassword.value && hasValidEmail.value
}

const checkEmail = () => {
  patternEmail.value.test(email.value)
    ? (hasCorrectEmail.value = true)
    : (hasCorrectEmail.value = false)
}

const checkEmailInputValid = () => {
  return !hasValidEmail.value ? (hasEmailError.value = true) : (hasEmailError.value = false)
}

const showPassword = () => {
  passwordType.value = 'text'
}

const hidePassword = () => {
  passwordType.value = 'password'
}

const hasValidPassword = computed(
  () =>
    hasLowerCase.value &&
    hasUpperCase.value &&
    hasMinLength.value &&
    hasOneDigit.value &&
    hasSpecialChar.value
)

const checkPasswordInputValid = () => {
  return !hasValidPassword.value
    ? (hasPasswordError.value = true)
    : (hasPasswordError.value = false)
}

const checkPassword = () => {
  // No blank space allowed //
  password.value = password.value.replace(/\s/g, '')
  patternLowerCase.value.test(password.value)
    ? (hasLowerCase.value = true)
    : (hasLowerCase.value = false)
  patternNbCharacter.value.test(password.value)
    ? (hasMinLength.value = true)
    : (hasMinLength.value = false)
  patternOneDigit.value.test(password.value)
    ? (hasOneDigit.value = true)
    : (hasOneDigit.value = false)
  patternUpperCase.value.test(password.value)
    ? (hasUpperCase.value = true)
    : (hasUpperCase.value = false)
  patternOneSpecialChar.value.test(password.value)
    ? (hasSpecialChar.value = true)
    : (hasSpecialChar.value = false)
}

const resetFormValues = () => {
  ;(firstName.value = ''), (lastName.value = ''), (email.value = ''), (password.value = '')
}

const submitRegisterForm = async () => {
  const params = {
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    password: password.value
  }
  try {
    await createUser(params)
    resetFormValues()
    router.push({ name: 'home' })
  } catch (e: unknown) {
    emailError.value = 'Une erreur est survenue.'
    if (axios.isAxiosError(e) && e.response) {
      const apiError = e.response.data.error
      if (apiError.code === 'email_in_use') {
        emailError.value = 'Cet email est déjà utilisé.'
      }
    }
    console.error('Signup error:', e)
  }
}
</script>
<template>
  <div>
    <Banner :data-c-y="'register_banner'" :title="'inscription'" />
    <div ref="loginPart" tabindex="-1" class="w-full flex justify-center px-14 py-14">
      <div class="w-[26rem]">
        <form aria-label="Formulaire d'inscription" @submit.prevent data-cy="register_form">
          <fieldset class="flex flex-col gap-3">
            <label class="ryman-eco text-dark-blue font-bold" for="first-name">PRÉNOM</label>
            <input
              v-model="firstName"
              name="first-name"
              class="border border-1 px-2 py-2.5"
              type="text"
              id="first-name"
            />
            <label class="ryman-eco text-dark-blue font-bold" for="last-name">NOM</label>
            <input
              v-model="lastName"
              class="border border-1 px-2 py-2.5"
              type="text"
              name="last-name"
              id="last-name"
            />
            <label class="ryman-eco text-dark-blue font-bold" for="email">COURRIEL</label>
            <div>
              <input
                v-model="email"
                class="border border-1 px-2 py-2.5 w-full"
                :class="{ error: hasEmailError }"
                type="text"
                id="email"
                name="email"
                aria-required="true"
                aria-describedby="email-error"
                required
                @keyup="checkEmail"
                @blur="checkEmailInputValid"
                data-unit-test="email"
              />
              <p
                role="alert"
                v-if="hasEmailError"
                id="email-error"
                class="text-red"
                data-unit-test="email_error"
              >
                Veuillez saisir une adresse email valide.
              </p>
            </div>

            <div id="hint-password" class="grid gap-2">
              <h2 class="text-xl ryman-eco text-dark-blue font-bold">
                Choisir votre mot de passe :
              </h2>
              <div class="border-dark-green border-l-4 pl-8">
                <p>Pour créer votre mot de passe, utiliser:</p>
                <ul class="list-disc pl-4" data-cy="pwd_list">
                  <li>
                    au moins
                    <strong data-unit-test="pwd_min_length" :class="{ valid: hasMinLength }"
                      >12 caractères</strong
                    >
                  </li>
                  <li>
                    au moins
                    <strong data-unit-test="pwd_uppercase" :class="{ valid: hasUpperCase }"
                      >1 lettre en majuscule</strong
                    >
                  </li>
                  <li>
                    au moins
                    <strong data-unit-test="pwd_lowercase" :class="{ valid: hasLowerCase }"
                      >1 lettre en minuscule</strong
                    >
                  </li>
                  <li>
                    au moins
                    <strong data-unit-test="pwd_digit" :class="{ valid: hasOneDigit }"
                      >1 chiffre</strong
                    >
                  </li>
                  <li>
                    au moins
                    <strong data-unit-test="pwd_special_char" :class="{ valid: hasSpecialChar }"
                      >1 caractère spécial</strong
                    >
                  </li>
                </ul>
              </div>
            </div>
            <label class="ryman-eco text-dark-blue font-bold" for="password">MOT DE PASSE</label>
            <div>
              <div class="border border-1 px-2 py-2.5 flex" :class="{ error: hasPasswordError }">
                <input
                  v-model="password"
                  class="w-full"
                  id="password"
                  name="password"
                  :type="passwordType"
                  :pattern="patternPasswordString"
                  aria-required="true"
                  aria-describedby="password-error"
                  required
                  @keyup="checkPassword"
                  @blur="checkPasswordInputValid"
                  data-unit-test="pwd"
                />
                <button
                  v-if="passwordType === 'password'"
                  aria-label="Afficher le mot de passe"
                  @click="showPassword"
                  data-unit-test="display_pwd"
                  data-cy="display_pwd"
                >
                  Afficher
                </button>
                <button
                  v-else
                  aria-label="Masquer le mot de passe"
                  @click="hidePassword"
                  data-unit-test="hide_pwd"
                  data-cy="hide_pwd"
                >
                  Masquer
                </button>
              </div>
              <p
                role="alert"
                v-if="hasPasswordError"
                id="password-error"
                class="text-red"
                data-unit-test="pwd_error"
              >
                Veuillez saisir un mot de passe valide.
              </p>
            </div>

            <button
              class="px-2 py-2.5 bg-dark-green mt-3 font-bold"
              type="submit"
              :disabled="!formIsValid()"
              :aria-disabled="!formIsValid()"
              :class="{ disabled: !formIsValid() }"
              @click="submitRegisterForm()"
              data-unit-test="create_user_btn"
            >
              Créer
            </button>
            <!-- TODO in next US create TOAST -->
            <!-- <p>{{ emailError }}</p> -->
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.valid {
  color: theme('colors.dark-green');
}
.error {
  border: 2px solid theme('colors.red');
}
.disabled {
  background-color: theme('colors.light-grey');
}
</style>
