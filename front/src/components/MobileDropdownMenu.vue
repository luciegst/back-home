<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Modal from '../components/ui/Modal.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'close-modal'): void
}>()

const isVisible = ref<boolean>(false)

const closeModal = () => {
  emit('close-modal')
}

onMounted(() => {
  isVisible.value = props.visible
})
</script>

<template>
  <Modal
    v-model="isVisible"
    :width="'100%'"
    :margin="'unset'"
    :ariaLabelledby="'nav menu mobile'"
    @update:model-value="emit('close-modal')"
  >
    <div class="mt-20" data-unit-test="mobile_dropdown_menu" :id="props.id">
      <ul class="flex flex-col text-center gap-4 justify-center">
        <li>
          <RouterLink
            class="text-base font-semibold uppercase px-2 py-2 hover:border-b-4"
            :to="{ name: 'lost.dogs' }"
            @click.native="closeModal()"
            >Chiens perdus</RouterLink
          >
        </li>
        <li>
          <RouterLink
            class="text-base font-semibold uppercase px-2 py-2 hover:border-b-4"
            :to="{ name: 'lost.cats' }"
            @click.native="closeModal()"
            >Chats perdus</RouterLink
          >
        </li>
      </ul>
    </div>
  </Modal>
</template>
