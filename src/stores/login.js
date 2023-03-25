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
    const user = ref({});

    const init = () => {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          user.value.id = currentUser.uid;
          user.value.email = currentUser.email;
          router.push("/");
        } else {
          user.value = {};
          router.replace("/login");
        }
      });
    };

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
      const res = await signInWithEmailAndPassword(
        auth,
        email.value,
        passwd.value
      )
        .then((res) => {
          router.replace({ name: "home" });
        })
        .catch((error) => {
          alert(error);
        });
    };

    const logout = async () => {
      await signOut(auth);
      router.replace({ name: "login" });
      email.value = "";
      passwd.value = "";
    };
    return { user, email, passwd, register, login, logout };
  },
  { persist: true }
);
