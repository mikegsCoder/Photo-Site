<script setup>
import { computed, reactive, onMounted, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import FormItem from '../../components/FormItem.vue';
import { getPostById } from '../../dataProviders/posts';
import Loader from '../../components/Loader.vue';

const post = ref({
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
});

const isLoading = ref(true);
const router = useRouter();
const route = useRoute();

onMounted(async () => {
	post.value = await getPostById(route.params._id);
  isLoading.value = false;
});

const rules = computed(() => ({}));

const v$ = useVuelidate(rules, post);

async function onSubmit() {};
</script>

<template>
<section id="edit-page">
  <div class="editSection">
      <div class="info">
        <h2>Edit your own post!</h2>
      </div>
      <Loader v-if="isLoading" />
    <form class="editForm" action="" @submit.prevent="onSubmit">
      <fieldset>
        <h2>Edit Post</h2>
        <ul class="noBullet">
          <!-- title -->
          <li>
            <FormItem 
              :v$="v$" 
              field="title" 
              label="Title:" 
              required
            >
              <input 
                class="inputFields" 
                id="title" 
                v-model="post.title"
                placeholder="Beautiful sunset"
              />
            </FormItem>
          </li>

          <!-- keyword -->
          <li>
            <FormItem 
              :v$="v$" 
              field="keyword" 
              label="Keyword:" 
              required
            >
              <input 
                class="inputFields" 
                id="keyword" 
                v-model="post.keyword" 
                placeholder="Sunset"
              />
            </FormItem>
          </li>

          <!-- location -->
          <li>
            <FormItem 
              :v$="v$" 
              field="location" 
              label="Location:" 
              required
            >
              <input 
                class="inputFields" 
                id="location" 
                v-model="post.location" 
                placeholder="Bulgaria" 
              />
            </FormItem>
          </li>

          <!-- date -->
          <li>
            <FormItem 
              :v$="v$" 
              field="date" 
              label="Date of creation:" 
              required
            >
              <input 
                class="inputFields" 
                id="date" 
                placeholder="18.05.2024" 
                v-model="post.date" 
              />
            </FormItem>
          </li>

          <!-- imageUrl -->
          <li>
            <FormItem 
              :v$="v$" 
              field="imageUrl" 
              label="Wildlife image:" 
              required
            >
              <input 
                class="inputFields" 
                id="image" 
                placeholder="http:/..." 
                v-model="post.imageUrl"
              />
            </FormItem>
          </li>

          <!-- description -->
          <li>
            <FormItem 
              :v$="v$" 
              field="description" 
              label="Description:" 
              required
            >
              <textarea 
                class="inputFields" 
                id="description" 
                placeholder="Beautiful sunset captured ..." 
                v-model="post.description"
              />
            </FormItem>
          </li>

          <li id="center-btn">
            <button type="submit" id="edit-btn">
              Edit
            </button>
          </li>
          
        </ul>
      </fieldset>
    </form>
  </div>
</section>
</template>

<style scoped>
</style>
