<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { getPostById, deletePost } from '../../dataProviders/posts';
import { useConfirm } from "primevue/useconfirm";
import { useUserStore } from '../../stores/userStore';

import Loader from '../../components/Loader.vue';
import ConfirmPopup from 'primevue/confirmpopup';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const confirm = useConfirm();

const post = ref({});
const author = ref({});
const votes = ref([]);
const isLoading = ref(true);
const isVisible = ref(false);
const isVoted = ref(false);
const currentUser = ref({});

onMounted(async () => {
  await loadData();
});

async function loadData() {
  post.value = await getPostById(route.params._id);
  author.value = post.value.author;
  votes.value = post.value.votes;
  isLoading.value = false;
  currentUser.value = userStore.profile;
  isVoted.value = votes.value.find(u => u._id == currentUser.value?._id) != null;
  isLoading.value = false;
}

function deleteHandler(event) {
  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure you want to delete this post?',
    header: 'Confirmation',
    onShow: () => {
      isVisible.value = true;
    },
    onHide: () => {
      isVisible.value = false;
    },
    accept: async () => {
      isLoading.value = true;
      await deletePost(post.value._id);
      router.push('/');
    },
    reject: () => {
    }
  });
}

async function votePositiveHandler() { }

async function voteNegativeHandler() { }
</script>

<template>
<section id="details-page">
  <div class="main_card">
    <div class="card_left">
      <div class="card_datails">
        <Loader v-if="isLoading" />
        <ConfirmPopup></ConfirmPopup>
        <h1>Title: {{ post.title }}</h1>
        <h3>Created by an author: {{ author.firstName }} {{ author.lastName }}</h3>
        <div class="card_animal">
          <p class="card-keyword">Keyword: {{ post.keyword }}</p>
          <p class="card-location">Location: {{ post.location }}</p>
          <p class="card-date">Date: {{ post.date }}</p>
        </div>
        <p class="disc">Description: {{ post.description }}</p>
        <div v-if="currentUser" class="social-btn">
          <!-- <div class="social-btn"> -->
          <RouterLink v-if="currentUser._id == author._id" :to="{ path: `/edit/${post._id}` }" class="edit-btn">
            Edit
          </RouterLink>
          <a v-if="currentUser._id == author._id" @click="deleteHandler($event)" class="del-btn">
            Delete
          </a>
          <p v-if="currentUser._id != author._id && isVoted" class="thanks-for-vote">
            Thanks For Voting
          </p>
          <a v-if="currentUser._id != author._id && !isVoted" @click="votePositiveHandler" class="vote-up">
            UpVote +1
          </a>
          <a v-if="currentUser._id != author._id && !isVoted" @click="voteNegativeHandler" class="vote-down">
            DownVote -1
          </a>
        </div>
      </div>
    </div>
    <div class="card_right">
      <img :src="post.imageUrl" alt="image">
    </div>
  </div>
</section>

<section id="votes">
  <div class="vote-info">
    <div class="card_left">
      <div class="card_datails">
        <h1>Votes</h1>
        <div class="card_vote">
          <p class="PV">Total rating of votes: {{ post.rating }}</p>
        </div>
        <p v-if="votes.length > 0" class="disc">
          People who voted for the post -
          <span v-for="vote in votes">
            {{ vote.firstName + ' ' + vote.lastName }}
            <span v-if="votes.indexOf(vote) < votes.length - 1">, </span>
            <span v-if="votes.indexOf(vote) == votes.length - 1">.</span>
          </span>
        </p>
        <p v-else class="disc">
          People who voted for the post - No one has voted yet.
        </p>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
#details-page {
  margin-top: 7.5em;
  left: 50%;
}

.main_card {
  color: #fff;
  height: 500px auto;
  margin: 50px auto;
  display: flex;
  left: 55%;
  max-width: 950px;
  background: #e4a1a9;
  background: -webkit-linear-gradient(to right, #03434C, rgb(179, 91, 98));
  background: -webkit-gradient(linear, left top, right top, from(#03434C), to(rgb(#08272C)));
  background: -webkit-linear-gradient(left, #03434C, #08272C);
  background: -o-linear-gradient(left, #03434C, #08272C);
  background: linear-gradient(to right, #03434C, #08272C);
  -webkit-box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}

.card_left {
  width: 570px;
}

.card_datails {
  width: 96%;
  padding: 50px;
  margin-top: -25px;
}

.card_datails h1 {
  font-size: 29px;
  padding-bottom: 8px;
}

.card_right img {
  height: 100%;
  max-height: 420px;
  width: 420px;
  border-radius: 2px;
}

.card_animal {
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-top: 27px;
  margin-bottom: 20px;
}

.PG,
.card-keyword,
.card-date,
.card-location {
  color: rgb(223, 210, 210);
  padding: 8px;
  font-weight: bold;
  border-radius: 15px;
}

.PG {
  background: rgba(116, 153, 226, 0.89);
  -webkit-box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
  /* -webkit-transition: 300ms ease-in-out; */
}

.disc {
  font-weight: 100;
  font-size: 17.5px;
  line-height: 27px;
}

.social-btn {
  margin-left: -10px;
  margin-top: 2em;
}

.social-btn>.edit-btn,
.del-btn,
.vote-up,
.vote-down,
.thanks-for-vote {
  color: #fff;
  /* border: none; */
  padding: 14px;
  outline: none;
  font-size: 18px;
  font-weight: 600;
  margin-top: 40px;
  border-radius: 12px;
  -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  -webkit-transition: 300ms ease-in-out;
  -o-transition: 200ms ease-in-out;
  transition: 200ms ease-in-out;
}

.del-btn {
  background-color: #88B04B;
}

.edit-btn {
  background-color: #EFC050;
}

.vote-up {
  background-color: #9B2335;
}

.thanks-for-vote {
  width: 185px;
  background-color: rgba(116, 153, 226, 0.89);
}

.get-statistics {
  background-color: darksalmon;
}

.vote-down {
  background-color: #5B5EA6;
}

.edit-btn:hover,
.del-btn:hover,
.vote-up:hover,
.vote-down:hover {
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}

.play_btn {
  height: 100%;
  margin: -394px auto;
  position: relative;
  text-align: center;
  background: rgba(0, 244, 170, 0.4);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
}

.fa-play-circle {
  color: #255;
  font-size: 160px;
  margin-top: 110px;
  -webkit-animation: bounce 1.0s -0.4s infinite;
  animation: bounce 1.0s -0.4s infinite;
}

.fa-play-circle:hover {
  color: aqua;
  animation: bounce 0.4s infinite;
}

@-webkit-keyframes bounce {
  8% {
    transform: scale(0.3);
    -webkit-transform: scale(0.8);
    opacity: 1;
  }

  10% {
    transform: scale(1.8);
    -webkit-transform: scale2;
    opacity: 0;
  }
}

@keyframes bounce {
  8% {
    transform: scale(0.3);
    -webkit-transform: scale(0.8);
    opacity: 1;
  }

  20% {
    transform: scale(1.8);
    -webkit-transform: scale2;
    opacity: 0;
  }
}

#catalog {
  max-width: 100%;
  text-align: center;
  margin-top: 1em;
}

#catalog>h1 {
  margin-top: 2.2em;
  margin-bottom: 0.5em;
  font-weight: 700;
  line-height: 1.1;
  padding: 7px;
  letter-spacing: 0px;
  font-size: 4rem;
  text-transform: capitalize;
  font-family: Georgia, serif;
  color: #ffffff !important;
  font-weight: bold;
  font-family: Ubuntu, sans-serif !important;
}

.card {
  margin-left: 4em;
  width: 420px;
  height: 510px;
  background: white;
  text-decoration: none;
  color: #444;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  transition: all .1s ease-in;
}

.thumb>img {
  height: 370px;
  width: 100%;
}

.card :hover {
  top: -2px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
}

article {
  padding: 28px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

p {
  flex: 1;
  line-height: 1.4;
}

span {
  font-size: 12px;
  font-weight: bold;
  color: #999;
  text-transform: uppercase;
  letter-spacing: .05em;
  margin: 2em 0 0 0;
}

.thumb {
  max-height: 350px;
  width: 100%;
  background-size: cover;
  background-position: center center;
}

#votes {
  margin-top: 3em;
  left: 50%;
}

.vote-info {
  color: #fff;
  height: 200px auto;
  margin: 50px auto;
  display: flex;
  max-width: 950px;
  background: #e4a1a9;
  background: -webkit-linear-gradient(to right, #03434C, rgb(179, 91, 98));
  background: -webkit-gradient(linear, left top, right top, from(#03434C), to(rgb(#08272C)));
  background: -webkit-linear-gradient(left, #03434C, #08272C);
  background: -o-linear-gradient(left, #03434C, #08272C);
  background: linear-gradient(to right, #03434C, #08272C);
  -webkit-box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}

.card_vote {
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-top: 6px;
  margin-left: 2em;
  margin-bottom: 25px;
}

.PV {
  background: #9B2335;
  -webkit-box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
  /* -webkit-transition: 300ms ease-in-out; */
  font-size: 18px;
}

.NV {
  background: rgba(116, 153, 226, 0.89);
  -webkit-box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
  font-size: 18.5px;
  /* -webkit-transition: 300ms ease-in-out; */
}

.PV,
.NV {
  color: fff;
  max-width: 300px;
  padding: 10px;
  font-weight: bold;
  border-radius: 15px;
  margin-left: 10px;
}

@media (min-width: 60em) {
  .item-1 {
    grid-column: 1 / span 2;
  }

  .item-1>h1 {
    font-size: 24px;
  }
}

/* .del-btn:hover {
    cursor: pointer;
} */

.edit-btn,
.del-btn,
.vote-up,
.vote-down {
  margin-inline: 1rem;
  border: 2px solid grey;
}

.edit-btn:hover,
.del-btn:hover,
.vote-up:hover,
.vote-down:hover {
  cursor: pointer;
  border: 2px solid red;
}

/* div.p-confirm-popup-content {
  font-size: 1.5 rem !important;

} */
</style>
