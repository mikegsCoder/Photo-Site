import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import ConfirmationService from 'primevue/confirmationservice';
import 'primevue/resources/themes/lara-dark-blue/theme.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(PrimeVue);
app.use(ConfirmationService);

app.mount('#app');
