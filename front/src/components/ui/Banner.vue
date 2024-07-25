<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  dataCY: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="bg-light-grey pt-6 pb-6">
    <h1
      class="ryman-eco font-bold text-dark-blue text-2xl text-center after:block after:w-40 after:bg-dark-green after:h-1 after:mx-auto after:mt-2 uppercase"
      :data-cy="props.dataCY"
    >
      {{ props.title }}
    </h1>
  </div>
</template>

<style scoped></style>
