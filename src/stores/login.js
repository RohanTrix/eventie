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
      createUserWithEmailAndPassword(auth, email.value, passwd.value)
        .then(() => {
          console.log("sucess");
          router.push("/");
        })
        .catch((error) => {
          alert(error);
        });
    };

    const login = async () => {
      const res = await signInWithEmailAndPassword(auth, email.value, passwd.value).then((res) => {
        router.replace({name: 'home'})
      }).catch((error) => {
        alert(error)
      })
    }

    const logout = async() => {
      await signOut(auth);
      router.replace({name: 'login'})
      email.value = ''
      passwd.value = ''
    }
    return { email, passwd, register };
  },
  { persist: true }
);
