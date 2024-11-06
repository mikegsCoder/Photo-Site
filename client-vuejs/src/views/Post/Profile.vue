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
    />
  </div>
</section>
</template>

<style scoped>
#my-posts {
  display: block;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  margin-left: 0%;
  margin-right: 0%;
  min-height: 350px;
  font-size: 20px;
  width: 100%;
}

#my-posts>h1 {
  font-size: 2.4rem;
  position: relative;
  font-weight: 700;
  line-height: 1.1;
  padding: 0;
  letter-spacing: 0px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: rgb(234, 236, 250);
  margin-top: 50px;
  text-align: center;
  font-size: 4.5rem;
  font-family: "Playfair Display", serif;
  margin-bottom: 0.4em;
}

.my-container {
  display: flex;
  background-color: #4d6d72;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
}

.no-posts {
  width: 98%;
  height: 440px;
  display: block;
  flex-wrap: wrap;
  background-color: #4d6d72;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 1em;
  text-align: center;
}

.no-posts>.no-offer {
  font-size: 44px;
  font-style: italic;
}

.no-posts-img {
  display: inline;
  width: 380px;
  height: 530px;
}

.no-posts-img>img {
  width: 400px;
  display: inline-block;
  height: 330px;
  border-radius: 10px;
  border: 13px solid #313131;
}

.my-card {
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 300px;
}

.card-header img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  height: 160px;
}

.tag {
  background: #cccccc;
  border-radius: 50px;
  font-size: 12px;
  margin: 0;
  color: #fff;
  margin-top: -1em;
  padding: 2px 10px;
  text-transform: uppercase;
}

.tag-teal {
  background-color: #47bcd4;
}

.tag-purple {
  background-color: #5e76bf;
}

.tag-pink {
  background-color: #cd5b9f;
}

.card-body p {
  font-size: 13px;
  margin: 0 0 30px;
}

.user {
  display: flex;
  margin-top: auto;
}

.user img {
  border-radius: 50%;
  width: 50px;
  height: 40px;
  margin-top: 1rem;
  margin-right: 10px;
}

.user-info h5 {
  margin: 0;
}

.user-info small {
  color: #545d7a;
}
</style>
