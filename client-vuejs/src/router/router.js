import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../views/Home.vue');
const Catalog = () => import('../views/Post/Catalog.vue');

const routes = [
  { path: '/', component: Home },
  { path: '/catalog', component: Catalog },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
