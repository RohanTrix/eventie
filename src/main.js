import { createApp } from "vue";
import { plugin, defaultConfig } from "@formkit/vue";
import { router } from "./router";
import App from "./App.vue";



// PrimeVue
import PrimeVue from "primevue/config";
import "./assets/main.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import ToastService from 'primevue/toastservice';
//core
import "primevue/resources/primevue.min.css";
//icons
import "primeicons/primeicons.css";


//Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate)


app.use(pinia);
app.use(plugin, defaultConfig);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.mount("#app");
