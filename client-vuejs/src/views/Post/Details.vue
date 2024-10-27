<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { getPostById } from '../../dataProviders/posts';
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

function deleteHandler(event) {}

async function votePositiveHandler() {}

async function voteNegativeHandler() {}
</script>

<template>
<section id="details-page">
  <div class="main_card">
    <div class="card_left">
      <div class="card_datails">
        <Loader v-if="isLoading" />
        <ConfirmPopup></ConfirmPopup>
        <h1>Title: {{post.title}}</h1>
        <h3>Created by an author: {{author.firstName}} {{author.lastName}}</h3>
        <div class="card_animal">
            <p class="card-keyword">Keyword: {{post.keyword}}</p>
            <p class="card-location">Location: {{post.location}}</p>
            <p class="card-date">Date: {{post.date}}</p>
        </div>
        <p class="disc">Description: {{post.description}}</p>
        <div v-if="currentUser" class="social-btn">
        <!-- <div class="social-btn"> -->
          <RouterLink 
            v-if="currentUser._id == author._id" 
            :to="{ path: `/edit/${post._id}`}"
            class="edit-btn"
          >
            Edit
          </RouterLink>
          <a v-if="currentUser._id == author._id" 
            @click="deleteHandler($event)"
            class="del-btn"
          >
            Delete
          </a>
          <p 
            v-if="currentUser._id != author._id && isVoted" 
            class="thanks-for-vote"
          >
            Thanks For Voting
          </p>
          <a 
            v-if="currentUser._id != author._id && !isVoted" 
            @click="votePositiveHandler"
            class="vote-up"
          >
            UpVote +1
          </a>
          <a 
            v-if="currentUser._id != author._id && !isVoted" 
            @click="voteNegativeHandler"
            class="vote-down"
          >
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
            <p class="PV">Total rating of votes: {{post.rating}}</p>
        </div>
        <p 
          v-if="votes.length > 0" 
          class="disc"
        >
          People who voted for the post - 
          <span v-for="vote in votes" >
            {{vote.firstName + ' ' + vote.lastName}}
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
</style>
