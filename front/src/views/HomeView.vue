<script setup lang="ts">
import HomeCard from '@/components/ui/HomeCard.vue'
</script>

<template>
  <div>
    <div class="bg-light-grey pt-14 pb-14">
      <h1
        class="ryman-eco font-bold text-dark-blue text-2xl text-center after:block after:w-40 after:bg-dark-green after:h-1 after:mx-auto after:mt-2"
        data-cy="homeview_main_title"
      >
        NOTRE RAISON D'ÊTRE
      </h1>
      <p class="ryman-eco font-bold text-4xl text-center my-16" data-cy="homeview_subtitle">
        RETROUVER CEUX QUI SE SONT
        <span class="relative">
          <span class="block absolute -inset-1 -skew-y-3 bg-dark-green" aria-hidden="true"></span>
          <span class="relative text-white">ÉGARÉS</span>
        </span>
      </p>
    </div>

    <div
      class="grid grid-cols-grid-auto-fit gap-8 justify-center py-14"
      data-cy="homeview_grid_content"
    >
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
