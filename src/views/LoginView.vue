<template>
    <main class="h-full w-min flex items-center ">

        <form @submit.prevent="handleLogin">
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

    </main>
</template>

<script setup>
import { ref } from "vue"

import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Card from 'primevue/card';
import Button from 'primevue/button';



import { useLoginStore } from '@/stores/login'
import { storeToRefs } from 'pinia';

const store = useLoginStore()
const { email, passwd } = storeToRefs(store);
const { login } = store;


const handleLogin = async () => {
    login();
}

</script>


<style scoped>
.custom-bg-gradient {
    background-image: linear-gradient(rgb(12, 110, 12), black 40%);
}
</style>