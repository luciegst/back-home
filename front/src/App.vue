<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header>
    <div>
      <a class="sr-only focus:not-sr-only" href="#main-content">Aller directement au contenu</a>
    </div>
    <NavBar />
  </header>
  <main tabindex="-1" id="main-content">
    <RouterView />
  </main>
  <footer></footer>
</template>

<style scoped></style>
