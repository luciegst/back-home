<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { fetchLostCats } from '@/services/apiPets'
import { type LostCats } from '@/types/pets'
import LostPetCard from '@/components/ui/LostPetCard.vue'

const cats = ref<LostCats[]>([])
const loading = ref<boolean>(false)

const lostCats = computed(() => cats.value)

const fetchAllLostCats = async () => {
  loading.value = true
  try {
    await fetchLostCats().then((res) => {
      cats.value = res
    })
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}

onMounted(() => {
  fetchAllLostCats()
})
</script>

<template>
  <div>
    <template v-if="!loading">
      <div data-unit-test="loading">loading</div>
    </template>
    <template v-else>
      <div class="bg-light-grey pt-14 pb-14">
        <h1
          class="ryman-eco font-bold text-dark-blue text-2xl text-center after:block after:w-40 after:bg-dark-green after:h-1 after:mx-auto after:mt-2"
          data-cy="lostcatsview_main_title"
        >
          LES CHATS
        </h1>
      </div>
      <div
        v-if="cats.length"
        class="pt-14 pb-14 grid md:grid-cols-grid-auto-fit justify-center gap-6"
        data-unit-test="lost_cats_list"
      >
        <LostPetCard
          v-for="(cat, i) in lostCats"
          :key="'cat-' + i"
          :pet="cat"
          data-cy="lost_pet_card"
        />
      </div>
    </template>
  </div>
</template>

<style scoped></style>
