import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../views/Home.vue');
const Catalog = () => import('../views/Post/Catalog.vue');

const Register = () => import('../views/User/Register.vue');
const Login = () => import('../views/User/Login.vue');

const routes = [
  { path: '/', component: Home },
  { path: '/catalog', component: Catalog },
  { path: '/register', component: Register },
  { path: '/login', component: Login, beforeEnter: () => {
    const userStore = useUserStore();
    return userStore.isAuthenticated ? { path: '/profile' } : true;
  } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
