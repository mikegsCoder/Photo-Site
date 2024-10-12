<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const items = ref([
  {
    label: 'All Posts',
    route: '/catalog',
    visible: () => true,
  },
]);
</script>

<template>
<header>
  <nav>
    <ul v-for="item in items.filter(i => i.visible())" class="menu">
      <li>
        <RouterLink v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" @click="navigate">
            <span @click="item.command" class="ml-2">
              {{ item.label }}
            </span>
          </a>
        </RouterLink>
      </li>
    </ul>
  </nav>
</header>
</template>

<style scoped></style>
