<script setup lang="ts">
import { type LostCats } from '../../types/pets'
import { type PropType } from 'vue'
const props = defineProps({
  pet: {
    type: Object as PropType<LostCats>,
    required: true
  }
})
</script>

<template>
  <div
    class="flex flex-col border-2 border-dark-green rounded-2xl md:w-[23rem] m-auto max-h-[500px] h-[500px]"
  >
    <div class="grid items-center rounded-t-2xl">
      <img
        class="rounded-t-2xl"
        width="100%"
        height="100%"
        :src="props.pet.image_url"
        alt="image de l'animal perdu"
        loading="lazy"
      />
    </div>
    <div class="grid items-center">
      <h2 class="text-center text-xl px-2.5 py-2.5">{{ props.pet.name }}</h2>
      <ul class="px-2.5 py-2.5">
        <li><strong class="text-dark-blue text-lg">Sexe: </strong> {{ props.pet.gender }}</li>
        <li><strong class="text-dark-blue text-lg">Couleur:</strong> {{ props.pet.color }}</li>
        <li><strong class="text-dark-blue text-lg">Race:</strong> {{ props.pet.breed }}</li>
        <li>
          <strong class="text-dark-blue text-lg">Département de disparition:</strong>
          {{ props.pet.department_number }}
        </li>
      </ul>

      <p class="text-truncate mx-2.5 my-3">
        {{ props.pet.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.text-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
