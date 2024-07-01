<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  margin: {
    type: String,
    default: 'auto'
  },
  width: {
    type: String,
    default: 'calc(100% - 2rem)'
  },
  ariaLabelledby: {
    type: String,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', b: boolean): void
}>()

const model = computed({
  get() {
    return props.modelValue
  },
  set(b: boolean) {
    emit('update:modelValue', b)
  }
})

function close() {
  model.value = false
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="model"
      class="modal"
      role="dialog"
      tabindex="-1"
      aria-modal="true"
      :aria-labelledby="ariaLabelledby"
    >
      <div class="modal-content" :style="{ margin, width }">
        <button class="corner" @click="close()" aria-label="close">
          <img src="@/assets/icons/cross.svg" alt="croix" />
        </button>

        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  padding: 2em;
  margin: auto;
  background-color: white;
  box-shadow: 0px 4px rgba(0, 0, 0, 0.16);
  border-radius: 12px;
  max-width: 640px;
  width: calc(100% - 2rem);
}

.corner {
  position: absolute;
  top: 1em;
  right: 1em;
  cursor: pointer;
}
</style>
