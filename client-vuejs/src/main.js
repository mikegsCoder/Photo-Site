import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import ConfirmationService from 'primevue/confirmationservice';
import 'primevue/resources/themes/lara-dark-blue/theme.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(PrimeVue);
app.use(ConfirmationService);

app.mount('#app');
