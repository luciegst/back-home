<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { fetchLostCats } from '@/services/apiPets'
import { type LostCats } from '@/types/pets'
import LostPetCard from '@/components/ui/LostPetCard.vue'
import Loader from '@/components/ui/Loader.vue'
import Banner from '@/components/ui/Banner.vue'

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
    <template v-if="loading">
      <div data-unit-test="loading">
        <Loader :ariaBusy="loading" />
      </div>
    </template>
    <template v-else>
      <Banner :title="'les chats'" :data-c-y="'lostcatsview_main_title'" />
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
