<script setup>
import { onMounted, ref } from 'vue';
import { getProfilePosts } from '../../dataProviders/posts';
import Loader from '../../components/Loader.vue';
import PostCardProfile from './components/PostCardProfile.vue';

const posts = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  posts.value = await getProfilePosts();
  isLoading.value = false;
});

function detailsClickHandler(e) {}
</script>

<template>
<section id="my-posts">
  <h1>My Posts</h1>
  <Loader v-if="isLoading" />
  <div v-else class="my-container">
    <!-- if no posts -->
    <div v-if="posts.length == 0" class="no-posts">
      <div class="no-posts-img">
        <img src="../../assets/img/common/photo3.jpg" alt="image_nature_3">
      </div>
      <p class="no-offer">There are no posts yet...</p>
    </div>
    <!-- if there are posts -->
    <PostCardProfile 
      v-else v-for="post in posts" 
      :key="`post-${post._id}`" 
      :post="post"
      @on-details-dlick="detailsClickHandler" 
    />
  </div>
</section>
</template>

<style scoped>
</style>
