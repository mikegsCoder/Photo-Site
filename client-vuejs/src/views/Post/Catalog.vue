<script setup>
import { onMounted, ref } from 'vue';
import { getAllPosts } from '../../dataProviders/posts';
import Loader from '../../components/Loader.vue';
import PostCardCatalog from './components/PostCardCatalog.vue';

const posts = ref([]);
const isLoading = ref(true);

onMounted(async () => {
	posts.value = await getAllPosts();
	isLoading.value = false;
});

function detailsClickHandler(e) {
}
</script>

<template>
	<section id="catalog">
		<h1>Catalog Page</h1>
		<!-- <Loader  /> -->
		<Loader v-if="isLoading" />
		<div v-else class="band">
			<!-- if no posts -->
			<div v-if="posts.length == 0" class="no-posts">
				<div class="no-posts-img">
					<img 
						src="../../assets/img/common/photo3.jpg" 
						alt="image_nature_3"
					>
				</div>
				<p class="no-offer">There are no posts yet...</p>
			</div>
			<!-- if there are posts -->
			<PostCardCatalog 
				v-else 
				v-for="post in posts" 
				:key="`post-${post._id}`" 
				:post="post"
				@on-details-dlick="detailsClickHandler" 
			/>
		</div>
	</section>
</template>

<style scoped>
</style>
