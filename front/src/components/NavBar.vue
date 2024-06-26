<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAdPage = () => {
  router.push({ name: 'ad.page' })
}

const goToLostDogs = () => {
  router.push({ name: 'lost.dogs' })
}

const goToLostCats = () => {
  router.push({ name: 'lost.cats' })
}
</script>

<template>
  <nav tabindex="-1" id="nav-example" class="h-full">
    <div class="flex justify-end bg-texture-pattern">
      <button
        class="cursor-pointer flex gap-2 items-center my-3 mx-3 px-2 py-2 border-solid border-2 text-base font-semibold uppercase hover:bg-black hover:text-white"
        aria-haspopup="true"
        @click="goToAdPage()"
      >
        <img src="@/assets/icons/pencil-mark-plus.svg" />
        Publier une annonce
      </button>
    </div>
    <ul class="flex gap-4 justify-center my-3 mx-3">
      <li>
        <a
          class="text-base font-semibold uppercase px-2 py-2 hover:border-b-4"
          href="#"
          @click.prevent="goToLostDogs()"
          >Chiens perdus</a
        >
      </li>
      <li>
        <a
          class="text-base font-semibold uppercase px-2 py-2 hover:border-b-4"
          href="#"
          @click.prevent="goToLostCats()"
          >Chats perdus</a
        >
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
