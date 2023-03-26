import { defineStore } from "pinia";
import { ref } from "vue";
import { account } from "./appwriteconfig";
import { ID } from "appwrite";
import { useRouter } from "vue-router";


export const useLoginStore = defineStore(
  "storeAuth",
  () => {
    const router = useRouter();
    const email = ref("");
    const passwd = ref("");
    const user = ref({});

    const init = () => {
      // onAuthStateChanged(auth, (currentUser) => {
      //   if (currentUser) {
      //     user.value.id = currentUser.uid;
      //     user.value.email = currentUser.email;
      //     router.push("/");
      //   } else {
      //     user.value = {};
      //     router.replace("/login");
      //   }
      // });
    };

    const login = async () => {
      try {
        const response = await account.createEmailSession(email.value, passwd.value);
        console.log('loginResponse', response)
        user.value.id = response.$id;
        user.value.email = response.email;
        router.replace({ name: "home" })
      } catch (error) {
        alert(error.message)
      }
    };

    const register = async () => {
      // @ts-ignore
      const user_id = ID.unique();
      try {
        const response = await account.create(user_id, email.value, passwd.value);
        await login();
      } catch (error) {
        alert(error.message)
      }
    };

    const logout = async () => {
      try {
        const response = await account.deleteSession('current');
        router.replace({ name: "login" });
        email.value = "";
        passwd.value = "";
      } catch (error) {
        alert(error.message)
      }
    };
    return { user, email, passwd, register, login, logout, init };
  },
  { persist: true }
);
