<script setup>
import { computed, onMounted, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers, minLength, maxLength, required, url } from '@vuelidate/validators';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { getPostById, editPost } from '../../dataProviders/posts';
import FormItem from '../../components/FormItem.vue';
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

const rules = computed(() => ({
  title: {
    required: helpers.withMessage('Title is required.', required),
    minLength: helpers.withMessage('Title must be at least 6 characters long.', minLength(6)),
  },
  keyword: {
    required: helpers.withMessage('Keyword is required.', required),
    minLength: helpers.withMessage('Keyword must be at least 4 characters long.', minLength(4)),
  },
  location: {
    required: helpers.withMessage('Location is required.', required),
    maxLength: helpers.withMessage('Location must be at most 15 characters long.', maxLength(15))
  },
  date: {
    required: helpers.withMessage('Date is required.', required),
    minLength: helpers.withMessage('Date must be exactly 10 characters long.', minLength(10)),
    maxLength: helpers.withMessage('Date must be exactly 10 characters long.', maxLength(10)),
  },
  imageUrl: {
    required: helpers.withMessage('Image is required.', required),
    url: helpers.withMessage('Please enter a valid image URL.', url)
  },
  description: {
    required: helpers.withMessage('Description is required.', required),
    minLength: helpers.withMessage('Description must be at least 8 characters long.', minLength(8)),
  },
}));

const v$ = useVuelidate(rules, post);

async function onSubmit() {
  const isValid = await v$.value.$validate();
  
  if (isValid) {
    isLoading.value = true;
    await editPost(post.value._id, post.value);

    router.push(`/details/${post.value._id}`);
    isLoading.value = false;
  }
};
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
.editForm fieldset {
  border: none;
}

.info>h2 {
  padding-top: 13em;
  font-weight: 300;
  font-size: 23px;
}

input:not(.input-error), textarea {
  border-left: 0.3em solid green;
}

fieldset>h2 {
  margin: 1rem;
}

li ::marker{
  color: transparent;
}
</style>
