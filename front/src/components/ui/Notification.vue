<script setup lang="ts">
import AsyncIcon from '@/components/icons/AsyncIcon.vue'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()

const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    required: true,
    validator: (value: string) => ['', 'success', 'error'].includes(value)
  },
  text: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 5000
  }
})
const setTransitionDuration = (el: Element) => {
  ;(el as HTMLElement).style.setProperty('--transition-duration', `${props.duration}ms`)
}
const hide = () => {
  notificationStore.hideNotification()
}
</script>

<template>
  <Teleport data-unit-test="teleport-notification" to="body">
    <Transition
      name="notification"
      @before-enter="setTransitionDuration"
      @before-leave="setTransitionDuration"
    >
      <div
        v-if="notificationStore.notificationStatus"
        role="status"
        class="notification-container w-fit fixed px-2 py-2 bottom-4 right-4 z-10 rounded"
        :class="[`notif--${type}`]"
        data-unit-test="notification"
      >
        <div class="notification-content flex justify-between">
          <div class="flex items-center gap-3 min-w-60">
            <AsyncIcon
              v-if="props.icon"
              :icon="props.icon"
              :alt="'icon-' + type"
              aria-hidden="true"
              data-unit-test="notif_icon"
            />
            <p data-unit-test="notif_text">{{ props.text }}</p>
          </div>

          <button class="corner" @click="hide" aria-label="close" data-unit-test="btn_close_notif">
            <img src="@/assets/icons/cross.svg" alt="croix" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped>
.notification-container {
  box-shadow: 0px 2px 8px rgba(72, 72, 72, 0.25);
  transition: translate 0.3s ease-in-out;
}

.notification-enter-from {
  translate: 100% 0;
}

.notification-enter-to {
  translate: 0 1;
}

.notification-leave-from {
  translate: 0 1;
}

.notification-leave-to {
  translate: 100% 0;
}

.notif--success {
  background-color: theme('colors.notif-success');
}

.notif--error {
  background-color: theme('colors.notif-error');
}
</style>
