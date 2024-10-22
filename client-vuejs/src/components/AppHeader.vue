<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const router = useRouter();

const items = ref([
  {
    label: 'All Posts',
    route: '/catalog',
    visible: () => true,
  },
  {
		label: 'Create Post',
		route: '/create',
		visible: () => userStore.isAuthenticated,
	},
  {
		label: 'Register',
		route: '/register',
		visible: () => !userStore.isAuthenticated,
	},
  {
		label: 'Login',
		route: '/login',
		visible: () => !userStore.isAuthenticated,
	},
]);

const logoutHandler = () => {
  userStore.userStoreLogout();
  router.push('/');
}
</script>

<template>
<header>
  <nav>
    <img 
				id="logo-img" 
				src="../assets/img/common/logo.png" 
				alt="logo" 
				@click="router.push('/')"
			>
    <ul v-for="item in items.filter(i => i.visible())" class="menu">
      <li>
        <RouterLink v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" @click="navigate">
            <span @click="item.command" class="ml-2">
              {{ item.label }}
            </span>
          </a>
        </RouterLink>
      </li>
    </ul>
    <img 
        v-if="userStore.isAuthenticated"
        @click="logoutHandler"
        id="logout-icon" 
        src="../assets/img/common/logout.png" 
        alt="logout"
      >
  </nav>
</header>
</template>

<style scoped>
nav {
	background-color: #72A4AB;
	width: 100%;
	display: flex;
	font-size: 1.5rem;
	justify-content: space-around;
	align-items: center;
	margin-top: 0;
	padding: 0rem 4rem 0 3rem;
	margin: 0%;
	height: 100px;
}

nav ul {
	margin: 0 0 0 auto;
}

nav ul li {
	display: inline-block;
	margin: 0 0.8em;
}

nav h1 {
	color: white;
}

ul a {
	text-decoration: none;
	border-radius: 50%;
	padding: 0.5em;
	color: white;
	text-transform: uppercase;
}

#logo-img {
	width: 80px;
	height: 70px;
	margin-left: 10px;
	margin-right: 15rem; 
	opacity: 0.6;
	border: 3px solid rgb(45, 48, 51);
	border-radius: 1rem;
}

#logo-img:hover {
	cursor: pointer;
	opacity: 1;
	border: 4px solid blue;
}

nav a:hover {
	font-weight: normal;
	height: 30px;
	border-radius: 10%;
	background-color: #364236;
	cursor: pointer;
}

#logout-icon {
	width: 40px;
	height: 40px;
	opacity: 0.7;
	margin-left: 5rem;
}

#logout-icon:hover {
	width: 45px;
	height: 45px;
	cursor: pointer;
	opacity: 1;
	margin-left: 4.7rem;
}
</style>

