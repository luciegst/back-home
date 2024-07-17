<script setup lang="ts">
import IconPaw from '../icons/IconPaw.vue'
const props = defineProps({
  ariaBusy: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div
    role="status"
    class="flex justify-center mt-32"
    :aria-busy="props.ariaBusy"
    aria-live="polite"
    aria-label="Chargement en cours"
  >
    <div class="loader">
      <div class="paw">
        <IconPaw :width="50" :height="50" :color="'dark-blue'" />
      </div>
      <div class="paw">
        <IconPaw :width="50" :height="50" :color="'dark-blue'" />
      </div>
      <div class="paw">
        <IconPaw :width="50" :height="50" :color="'dark-blue'" />
      </div>
      <div class="paw">
        <IconPaw :width="50" :height="50" :color="'dark-blue'" />
      </div>
      <div class="paw">
        <IconPaw :width="50" :height="50" :color="'dark-blue'" />
      </div>
      <div class="paw">
        <IconPaw :width="50" :height="50" :color="'dark-blue'" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  transform-origin: 50% 50%;
  transform: rotate(90deg) translate(-50%, 0%);

  .paw {
    animation: 2050ms pawAnimation ease-in-out infinite;

    &:nth-child(odd) {
      transform: rotate(-10deg);
    }

    &:nth-child(even) {
      transform: rotate(10deg) translate(125%, 0);
    }

    &:nth-child(1) {
      animation-delay: 1.25s;
    }

    &:nth-child(2) {
      animation-delay: 1s;
    }

    &:nth-child(3) {
      animation-delay: 0.75s;
    }

    &:nth-child(4) {
      animation-delay: 0.5s;
    }

    &:nth-child(5) {
      animation-delay: 0.25s;
    }

    &:nth-child(6) {
      animation-delay: 0s;
    }
  }
}

@keyframes pawAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
