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
</script>

<template>
	<section id="catalog">
		<h1>Catalog Page</h1>
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
			/>
		</div>
	</section>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700);
@import url(https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic);

#catalog>h1 {
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

.band {
	width: 98%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	box-shadow: 0 0px 81px #5b848a;
	background-color: #4d6d72;
	padding-top: 20px;
	padding-bottom: 20px;
	margin-left: 1.5em;
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
</style>
