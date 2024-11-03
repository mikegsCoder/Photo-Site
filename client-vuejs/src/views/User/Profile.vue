<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../stores/userStore';

const currentUser = ref({
  posts: []
});

const memberTime = ref('');
const userStore = useUserStore();

onMounted(async () => {
  currentUser.value = userStore.profile;
  memberTime.value = timePeriod(userStore.profile.created_at)
});

const timePeriod = (value) => {
  return '';
}
</script>

<template>
<div class="profile">
  <img src="../../assets/img/common/user.png" alt="default user">
  <h3>User Info:</h3>
  <div>
    <div class="flex">
      <p>First name: </p>
      <p>{{ currentUser.firstName }}</p>
    </div>
    <div class="flex">
      <p>Last name: </p>
      <p>{{ currentUser.lastName }}</p>
    </div>
    <div class="flex">
      <p>Email: </p>
      <p>{{ currentUser.email }}</p>
    </div>
    <div class="flex">
      <p>Posts: </p>
      <p>{{ currentUser.posts.length }}</p>
    </div>
    <div class="flex">
      <p>Member for: </p>
      <p>{{ memberTime }}</p>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>