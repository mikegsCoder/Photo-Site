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
  /* cursor: pointer; */
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