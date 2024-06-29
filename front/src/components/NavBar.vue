<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useDeviceStore } from '@/stores/device'
import { computed } from 'vue'

const deviceStore = useDeviceStore()
const router = useRouter()

const isMobile = computed(() => deviceStore.deviceType === 'mobile')

const goToAdPage = () => {
  router.push({ name: 'ad.page' })
}
</script>

<template>
  <nav tabindex="-1" id="nav-example" class="h-full">
    <div class="flex justify-between bg-texture-pattern">
      <RouterLink to="/">
        <img v-if="!isMobile" class="my-3 mx-3 px-1 py-1" src="@/assets/logo.svg" alt="logo site" />
        <img
          v-if="isMobile"
          class="my-3 mx-3 px-1 py-1"
          src="@/assets/mobile_logo.svg"
          alt="logo site"
        />
      </RouterLink>
      <button
        class="cursor-pointer flex gap-2 items-center my-3 mx-3 px-1 py-1 border-solid border-2 text-base font-semibold uppercase hover:bg-black hover:text-white"
        aria-haspopup="true"
        @click="goToAdPage()"
      >
        <img v-if="!isMobile" src="@/assets/icons/pencil-mark-plus.svg" alt="crayon" />
        Publier une annonce
      </button>
    </div>
    <div class="py-3 px-3 border-solid border-b-2">
      <ul class="flex gap-4 justify-center">
        <li>
          <RouterLink
            class="text-base font-semibold uppercase px-2 py-2 hover:border-b-4"
            to="/lost/dogs"
            >Chiens perdus</RouterLink
          >
        </li>
        <li>
          <RouterLink
            class="text-base font-semibold uppercase px-2 py-2 hover:border-b-4"
            to="/lost/cats"
            >Chats perdus</RouterLink
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped></style>
