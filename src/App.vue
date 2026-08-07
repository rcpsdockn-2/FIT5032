
<script setup>
import MyName from './components/MyName.vue'
</script>

<template>
  <main class="welcome-page">
    <section class="welcome-card" aria-labelledby="welcome-title">
      <p class="eyebrow">FIT5032 · VueJS eFolio</p>
      <h1 id="welcome-title">Welcome to my VueJS app</h1>
      <MyName />
    </section>
  </main>
</template>
