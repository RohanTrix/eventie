<template>
    <main class="h-full w-min flex items-center ">

        <form @submit.prevent="login">
            <Card>
                <template #header>
                    <img class="overflow-hidden" src="src/assets/images/event-login.jpg" alt="">
                </template>
                <template #title>
                    <h2 class="text decoration-solid text-2xl font-mono">Log In</h2>
                </template>
                <template #content>
                    <section class="mb-4">

                        <h4 class="mb-2 text-xl">Email</h4>
                        <InputText v-model="email" placeholder="Email" />
                        <h4 class="mt-2 mb-2 text-xl">Password</h4>
                        <Password v-model="passwd" placeholder="Password" toggleMask />
                    </section>
                    <Button type="submit" label="Log In" size="small" icon="pi pi-check" />

                </template>
            </Card>
        </form>
        <Teleport to="body">

            <Toast />
        </Teleport>

    </main>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Card from 'primevue/card';
import Button from 'primevue/button';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { ref } from "vue"
import { useLoginStore } from '@/stores/login'

import { useRouter } from 'vue-router';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
const toast = useToast();

const email = ref('')
const passwd = ref('')

const loginStore = useLoginStore();
const { setLoggedIn } = loginStore;

const auth = getAuth();
auth.onAuthStateChanged(user => {
    console.log(user);
})
const router = useRouter();
const login = async () => {
    await signInWithEmailAndPassword(auth, email.value, passwd.value).then((data) => {
        console.log('Sucess')

        toast.add({ severity: 'success', summary: 'Login Successful', detail: 'Login Success', life: 3000 });
        setLoggedIn();
        router.push('/')
        
    })
        .catch((error) => {
            toast.add({ severity: 'error', summary: error.message, detail: 'Please login again', life: 3000 });
        })
}
</script>


<style scoped>
.custom-bg-gradient {
    background-image: linear-gradient(rgb(12, 110, 12), black 40%);
}
</style>