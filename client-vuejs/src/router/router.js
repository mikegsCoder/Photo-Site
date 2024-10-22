import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const Home = () => import('../views/Home.vue');
const Catalog = () => import('../views/Post/Catalog.vue');
const NotFound = () => import('../components/NotFound.vue');

const Register = () => import('../views/User/Register.vue');
const Login = () => import('../views/User/Login.vue');

const Create = () => import('../views/Post/Create.vue');

const routes = [
  { path: '/', component: Home },
  { path: '/catalog', component: Catalog },
  { path: '/register', component: Register },
  { path: '/login', component: Login, beforeEnter: () => {
    const userStore = useUserStore();
    return userStore.isAuthenticated ? { path: '/profile' } : true;
  } },
  { path: '/create', component: Create, beforeEnter: () => {
    const userStore = useUserStore();
    return userStore.isAuthenticated ? true : { path: '/login' };
  } },
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
