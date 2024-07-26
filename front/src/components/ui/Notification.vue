<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close-notification'): void
}>()

const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: '',
    validator: (value: string) => ['success', 'error'].includes(value)
  },
  text: {
    type: String,
    required: true
  },
  show: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <Teleport data-unit-test="teleport-notification" to="body">
    <Transition name="notification">
      <div v-if="show" role="status" class="notification-container" :class="[`notif--${type}`]">
        <div class="notification-content flex justify-between">
          <div class="flex items-center">
            <img src="@/assets/icons/cross.svg" :alt="'icon-' + type" aria-hidden="true" />
            <p>{{ props.text }}</p>
          </div>

          <button
            class="corner"
            @click="emit('close-notification')"
            aria-label="close"
            data-unit-test="btn_close_modal"
          >
            <img src="@/assets/icons/cross.svg" alt="croix" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped>
.notification-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 9999;
  padding: 0.5rem;
  width: 18rem;
  border-radius: 0.25rem;
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
