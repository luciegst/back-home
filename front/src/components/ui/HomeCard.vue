<script setup lang="ts">
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
</script>

<template>
  <div tabindex="0" class="w-fit relative overflow-hidden">
    <RouterLink :to="props.href">
      <img :src="props.img" :alt="props.alt" class="zoom-img" />
      <button class="px-5 py-3 bg-dark-green absolute bottom-4 right-0 font-semibold">
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
