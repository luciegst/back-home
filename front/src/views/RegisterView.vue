<script setup lang="ts">
import { ref } from 'vue'
const passwordType = ref<string>('password')
const password = ref<string>('')
const patternPassword = ref<RegExp>(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{12,}$/)

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

const showPassword = () => {
  passwordType.value = 'text'
}

const hidePassword = () => {
  passwordType.value = 'password'
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
</script>
<template>
  <div>
    <div class="bg-light-grey pt-14 pb-14">
      <h1
        class="ryman-eco font-bold text-dark-blue text-2xl text-center after:block after:w-40 after:bg-dark-green after:h-1 after:mx-auto after:mt-2"
        data-cy="lostcatsview_main_title"
      >
        INSCRIPTION
      </h1>
    </div>
    <div ref="loginPart" tabindex="-1" class="w-full flex justify-center px-14 py-14">
      <div class="w-[26rem]">
        <form aria-label="Formulaire d'inscription">
          <fieldset class="flex flex-col gap-3">
            <label class="ryman-eco text-dark-blue font-bold" for="first-name"> PRÉNOM </label>
            <input class="border border-1 px-2 py-2.5" type="text" id="first-name" />
            <label class="ryman-eco text-dark-blue font-bold" for="last-name"> NOM </label>
            <input class="border border-1 px-2 py-2.5" type="text" id="last-name" />
            <label class="ryman-eco text-dark-blue font-bold" for="email"> COURRIEL </label>
            <input
              class="border border-1 px-2 py-2.5"
              type="text"
              id="email"
              aria-required="true"
              required
            />
            <div id="hint-password" class="grid gap-2">
              <h2 class="text-xl ryman-eco text-dark-blue font-bold">
                Choisir votre mot de passe :
              </h2>
              <div class="border-dark-green border-l-4 pl-8">
                <p>Pour créer votre mot de passe, utiliser:</p>
                <ul class="list-disc pl-4">
                  <li>au moins <strong :class="{ valid: hasMinLength }">12 caractères</strong></li>
                  <li>
                    au moins <strong :class="{ valid: hasUpperCase }">1 lettre en majuscule</strong>
                  </li>
                  <li>
                    au moins <strong :class="{ valid: hasLowerCase }">1 lettre en minuscule</strong>
                  </li>
                  <li>au moins <strong :class="{ valid: hasOneDigit }">1 chiffre</strong></li>
                  <li>
                    au moins <strong :class="{ valid: hasSpecialChar }">1 caractère spécial</strong>
                  </li>
                </ul>
              </div>
            </div>
            <label class="ryman-eco text-dark-blue font-bold" for="password"> MOT DE PASSE </label>
            <div>
              <div class="border border-1 px-2 py-2.5 flex">
                <input
                  v-model="password"
                  class="w-full"
                  :type="passwordType"
                  :pattern="String(patternPassword)"
                  id="password"
                  aria-required="true"
                  aria-describedby="password-error"
                  required
                  @keyup="checkPassword"
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
              <p id="password-error">Veuillez saisir un mot de passe valide.</p>
            </div>

            <button class="px-2 py-2.5 bg-dark-green mt-3 font-bold" type="submit">Créer</button>
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
</style>
