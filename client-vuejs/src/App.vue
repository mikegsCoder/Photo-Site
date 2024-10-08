<script setup>
import AppFooter from './components/AppFooter.vue';
</script>

<template>
<main>
  <router-view />
</main>
<AppFooter />
</template>

<style scoped>
main {
  padding: 1rem 2rem;
}
</style>
