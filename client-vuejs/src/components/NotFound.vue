<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
<div class="full-screen">
  <div class='con-not-found'>
    <span class="error-num">4</span>
    <div class='eye'></div>
    <span class="error-num">4</span>

    <p class="sub-text">Something went wrong. We are <span class="italic">checking</span> this issue.</p>
    <p>
      Go Back to
      <RouterLink to="/">
        Home
      </RouterLink>
    </p>
  </div>
</div>
</template>

<style scoped>
</style>