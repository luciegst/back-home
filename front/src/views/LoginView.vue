<script setup lang="ts">
import { ref, onMounted } from 'vue'
const loginPart = ref<HTMLInputElement | null>(null)
const passwordType = ref<string>('password')

const showPassword = () => {
  passwordType.value = 'text'
}

const hidePassword = () => {
  passwordType.value = 'password'
}

onMounted(() => {
  if (loginPart.value) {
    loginPart.value.focus()
  }
})
</script>

<template>
  <div>
    <div class="bg-light-grey pt-14 pb-14">
      <h1
        class="ryman-eco font-bold text-dark-blue text-2xl text-center after:block after:w-40 after:bg-dark-green after:h-1 after:mx-auto after:mt-2"
        data-cy="lostcatsview_main_title"
      >
        CONNEXION
      </h1>
    </div>
    <div ref="loginPart" tabindex="-1" class="w-full flex justify-center px-14 py-14">
      <form aria-label="Formulaire de connexion" class="w-full w-[416px]">
        <fieldset class="flex flex-col gap-3">
          <label class="ryman-eco text-dark-blue font-bold" for="email"> COURRIEL </label>
          <input
            class="border border-1 px-2 py-2.5"
            type="text"
            id="email"
            aria-required="true"
            required
          />
          <label class="ryman-eco text-dark-blue font-bold" for="password"> MOT DE PASSE </label>
          <div class="border border-1 px-2 py-2.5 flex">
            <input
              class="w-full"
              :type="passwordType"
              id="password"
              aria-required="true"
              required
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

          <button class="px-2 py-2.5 bg-dark-green mt-3 font-bold" type="submit">
            Se connecter
          </button>
        </fieldset>

        <div class="mt-12 flex flex-col gap-1">
          <!-- TODO: lost password in a next US -->
          <!-- <button class="underline text-left font-bold">Mot de passe oublié ?</button> -->
          <button class="underline text-left font-bold">Créer un compte</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
