<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
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
</script>

<template>
	<div class="flip flip-vertical">
		<div class="front">
			<img :src="props.post.imageUrl" alt="post-image">
			<h1 class="text-shadow">
        Keyword: {{ props.post.keyword }}
      </h1>
		</div>
		<div class="back">
			<h2>{{ props.post.title }}</h2>
			<p>{{ props.post.description }}</p>
      <RouterLink 
        :to="{ path: `/details/${props.post._id}`}" 
        class="details"
      >
        Details
      </RouterLink>  
		</div>
	</div>
</template>

<style scoped>
</style>