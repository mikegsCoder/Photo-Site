import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useUserStore } from '../src/stores/userStore.js';
import App from './App.vue';
import router from './router/router';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import 'primevue/resources/themes/lara-dark-blue/theme.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(ConfirmationService);

const userStore = useUserStore();
userStore.getPersistedProfile();
app.mount('#app');
