<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  img: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  btnText: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  }
})

const goToLinkPage = (linkPath: string) => {
  router.push({ path: linkPath })
}
</script>

<template>
  <div tabindex="0" class="w-fit relative overflow-hidden" data-cy="home_card">
    <RouterLink :to="props.href" data-cy="home_card_link">
      <img
        :src="props.img"
        :alt="props.alt"
        class="zoom-img"
        data-cy="home_card_img"
        width="400"
        height="268"
      />
      <button
        class="px-5 py-3 bg-dark-green absolute bottom-4 right-0 font-semibold"
        data-cy="home_card_btn"
        :data-url="props.href"
        @click="goToLinkPage(props.href)"
      >
        {{ props.btnText }}
      </button>
    </RouterLink>
  </div>
</template>

<style>
.zoom-img:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  -webkit-transition: all 0.6s ease-out;
  transition: all 0.6s ease-out;
}
</style>
