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


//Firebase
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD9zX8JwSCNLssHnB1kzM4ckGhaTbEv84",
  authDomain: "eventie-d9847.firebaseapp.com",
  projectId: "eventie-d9847",
  storageBucket: "eventie-d9847.appspot.com",
  messagingSenderId: "493374462570",
  appId: "1:493374462570:web:3f03c690425971d3458813",
  measurementId: "G-4S81RGK1ZB"
};
// Initialize Firebase
initializeApp(firebaseConfig);


const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate)


app.use(pinia);
app.use(plugin, defaultConfig);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.mount("#app");
