import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "./firebaseconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "vue-router";

export const useLoginStore = defineStore(
  "storeAuth",
  () => {
    const router = useRouter();
    const email = ref("");
    const passwd = ref("");

    const register = async () => {
      createUserWithEmailAndPassword(
          auth,
          email.value,
          passwd.value
        ).then(() => {
          console.log('sucess')
          router.push('/')
        }).catch((error) => {
          alert(error);
        });
    };
    return { email, passwd, register };
  },
  { persist: true }
);
