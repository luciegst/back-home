<script setup lang="ts">
const props = defineProps({
  size: {
    type: Number,
    default: 32
  },
  color: {
    type: String,
    default: '#000000'
  }
})
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M256 42.667C138.18 42.667 42.667 138.18 42.667 256S138.18 469.333 256 469.333 469.333 373.82 469.333 256 373.82 42.667 256 42.667Zm0 384c-94.105 0-170.667-76.562-170.667-170.667S161.895 85.333 256 85.333 426.667 161.895 426.667 256 350.106 426.667 256 426.667Zm80.336-246.886 30.167 30.167-131.836 132.388-79.084-79.084 30.167-30.166 48.917 48.917L336.336 179.78Z"
      :fill="props.color"
      fill-rule="evenodd"
    />
  </svg>
</template>
