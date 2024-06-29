import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDeviceStore = defineStore('device', () => {
  const deviceType = ref<string>('')
  //using Tailwind breakpoints
  const breakpoints = ref<{ mobile: number; tablet: number; desktop: number }>({
    mobile: 640, // Tailwind 'sm'
    tablet: 768, // Tailwind 'md'
    desktop: 1024 // Tailwind 'lg'
  })
  function getDeviceType() {
    const screenWidth = window.innerWidth
    if (screenWidth < breakpoints.value.mobile) {
      // Tailwind 'sm'
      return 'mobile'
    } else if (screenWidth < breakpoints.value.tablet) {
      // Tailwind 'md'
      return 'tablet'
    } else {
      // Tailwind 'lg', 'xl', '2xl
      return 'desktop'
    }
  }
  function updateDevice() {
    deviceType.value = getDeviceType()
  }
  return { deviceType, updateDevice }
})
