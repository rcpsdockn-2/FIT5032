<script setup>
import { RouterView } from 'vue-router'
import BHeader from './components/BHeader.vue'
</script>

<template>
  <BHeader />

  <main class="app-content">
    <RouterView />
  </main>
</template>
