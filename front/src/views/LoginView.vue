<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Banner from '@/components/ui/Banner.vue'

const router = useRouter()
const loginPart = ref<HTMLInputElement | null>(null)
const passwordType = ref<string>('password')

const showPassword = () => {
  passwordType.value = 'text'
}

const hidePassword = () => {
  passwordType.value = 'password'
}

const goToCreateAccount = () => {
  router.push({ name: 'account.register' })
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
        <form aria-label="Formulaire de connexion">
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
        </form>
        <div class="mt-12 flex flex-col gap-1">
          <!-- TODO: lost password in a next US -->
          <!-- <button class="underline text-left font-bold">Mot de passe oublié ?</button> -->
          <button class="underline text-left font-bold" @click="goToCreateAccount">
            Créer un compte
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
