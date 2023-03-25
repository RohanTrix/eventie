import { defineStore } from "pinia";
import { ref } from "vue";
export const useLoginStore = defineStore(
  "login",
  () => {
    const user = ref(null);
    const loggedIn = ref(false);
    const setLoggedIn = () => {
      loggedIn.value = true;
    };
    const setLoggedOut = () => {
      loggedIn.value = false;
    };

    return { user, loggedIn, setLoggedIn, setLoggedOut };
  },
  { persist: true }
);
