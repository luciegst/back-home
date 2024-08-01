import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const notificationStatus = ref<boolean>(false)
  const notificationInfos = ref<{
    type: string
    text: string
    icon: string
    duration?: Number
  }>({
    type: '',
    text: '',
    icon: '',
    duration: 5000
  })

  const showNotification = (
    notificationText: string,
    notificationIcon: string,
    notificationType: string,
    notificationDuration: number = 5000
  ) => {
    notificationInfos.value.text = notificationText
    notificationInfos.value.icon = notificationIcon
    notificationInfos.value.type = notificationType
    notificationInfos.value.duration = notificationDuration
    notificationStatus.value = true

    setTimeout(hideNotification, notificationDuration)
  }

  const hideNotification = () => {
    notificationStatus.value = false
  }

  return { notificationStatus, notificationInfos, showNotification, hideNotification }
})
