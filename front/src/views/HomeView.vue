<script setup lang="ts">
import HomeCard from '@/components/ui/HomeCard.vue'
</script>

<template>
  <div>
    <h1 class="ryman-eco text-4xl font-extralight text-center my-5 mx-5">
      RETROUVER CEUX QUI SE SONT ÉGARÉS
    </h1>
    <div class="grid grid-cols-grid-auto-fit gap-8 justify-center">
      <HomeCard
        :img="'../src/assets/cards/cat_home_card.jpg'"
        :alt="'image de chat'"
        :btn-text="'Les chats'"
        :href="'/lost/cats'"
      />
      <HomeCard
        :img="'../src/assets/cards/dog_home_card.jpg'"
        :alt="'image de chien'"
        :btn-text="'Les chiens'"
        :href="'/lost/dogs'"
      />
    </div>
  </div>
</template>

<style scoped></style>
