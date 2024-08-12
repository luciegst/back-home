<script setup lang="ts">
import { defineAsyncComponent, watch, onMounted, shallowRef } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#000000'
  },
  size: {
    type: Number,
    default: 32
  }
})

const iconComponent = shallowRef<ReturnType<typeof defineAsyncComponent> | null>(null)

//iconName should respect PascalCase format
const loadIcon = (iconName: string) => {
  try {
    iconComponent.value = defineAsyncComponent(() => import(`../icons/${iconName}.vue`))
  } catch (error) {
    console.error(`Icon ${iconName} could not be loaded`, error)
  }
}

// Reactively load the icon whenever the icon prop changes
watch(
  () => props.icon,
  (newIcon) => {
    loadIcon(newIcon)
  }
)

onMounted(() => {
  loadIcon(props.icon)
})
</script>

<template>
  <component v-if="iconComponent" :is="iconComponent" :color="props.color" :size="props.size" />
</template>
