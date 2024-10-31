<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  post: {
    type: Object,
    required: true,
    default: () => ({
      _id: '',
      author: {},
      created_at: '',
      date: '',
      description: '',
      imageUrl: '',
      keyword: '',
      location: '',
      rating: 0,
      title: '',
      updatedAt: '',
      votes: []
    }),
  },
});

const router = useRouter();

const emit = defineEmits(['onDetailsClick']);

onMounted(async () => {
  // console.log('Post card mounted!');
  // console.log(props.post);
});

const clickHandler = () => {
  router.push(`/details/${props.post._id}`)
}
</script>

<template>
<div class="my-card">
  <div class="card-header">
    <img 
      :src="props.post.imageUrl" 
      alt="post-image"
      @click="clickHandler"
    >
  </div>
  <div class="card-body">
    <span class="tag tag-teal">Keyword: {{ props.post.keyword }}</span>
    <h4>
      Title: {{ props.post.title }}
    </h4>
    <div class="user">
      <img 
        src="../.././../assets/img/common/vote-icon.jpg" 
        alt="vote" 
      />
      <div class="user-info">
        <h5>Author: {{ props.post.author.firstName }} {{ post.author.lastName }}</h5>
        <small>Rating of votes: {{ props.post.rating }}</small>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>