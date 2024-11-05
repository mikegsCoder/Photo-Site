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
  let result = '';

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerMonth * 365;

  const valueDate = new Date(value);
  const current = new Date();
  const elapsed = +current - +valueDate;

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (elapsed < msPerMinute) {
      result = rtf.format(-Math.floor(elapsed / 1000), 'seconds');
  } else if (elapsed < msPerHour) {
      result = rtf.format(-Math.floor(elapsed / msPerMinute), 'minutes');
  }else if (elapsed < msPerDay) {
      result = rtf.format(-Math.floor(elapsed / msPerHour), 'hours');
  }else if (elapsed < msPerMonth) {
      result = rtf.format(-Math.floor(elapsed / msPerDay), 'days');
  } else if (elapsed < msPerYear) {
      result = rtf.format(-Math.floor(elapsed / msPerMonth), 'months');
  } else{
      result = rtf.format(-Math.floor(elapsed / msPerYear), 'years');
  }

  return result.slice(0, result.length - 3);
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