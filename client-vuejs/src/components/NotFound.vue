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
.full-screen {
  background-color: #081F27;
  width: 100%;
  margin-top: 5em;
  height: 300px;
  color: white;
  font-family: 'Arial Black';
  text-align: center;
}

.con-not-found {
  padding-top: 2em;
  padding: auto;
  width: 50%;
  display: block;
  margin: 0 auto;
}

.error-num {
  font-size: 8em;
}

.eye {
  background: #72A4AB;
  border-radius: 50%;
  display: inline-block;
  height: 90px;
  position: relative;
  width: 80px;
  margin-bottom: -1rem;
  margin-inline: 0.5rem;
}

.eye ::after {
  background: #000;
  border-radius: 50%;
  bottom: 56.1px;
  content: ' ';
  height: 33px;
  position: absolute;
  right: 33px;
  width: 33px;
}

.italic {
  font-style: italic;
  font-size: 19px;
  font-weight: bold;
  margin-inline: 0.4rem;
}

.con-not-found>p {
  margin-bottom: 0.7em;
  font-size: 19px;
  color: white;
}

.con-not-found>p>a {
  color: #72A4AB;
  font-weight: bolder;
  font-size: 20px;
  font-variant: small-caps;
  text-decoration: rgb(247, 218, 218);
}

.con-not-found>p>a:hover {
  color: lightgray;
}
</style>