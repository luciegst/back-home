<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchLostCats } from '@/services/apiPets'
import { type LostCats } from '@/types/pets'

const cats = ref<LostCats[]>([])

const fetchAllLostCats = async () => {
  try {
    await fetchLostCats().then((res) => {
      cats.value = res
    })
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchAllLostCats()
})
</script>

<template>
  <div class="about">
    <h1>{{ cats }}</h1>
  </div>
</template>

<style scoped></style>
