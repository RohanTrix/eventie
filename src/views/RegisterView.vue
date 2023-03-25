<template>
    <main class="h-full w-min flex items-center ">

        <form @submit.prevent="handleRegister">

            <Card>
                <template #header>
                    <img class="overflow-hidden" src="src/assets/images/event-login.jpg" alt="">
                </template>
                <template #title>
                    <h2 class="text decoration-solid text-2xl font-mono">Create an account</h2>
                </template>
                <template #content>
                    <section class="mb-4">

                        <h4 class="mb-2 text-xl">Email</h4>
                        <InputText v-model="email" placeholder="Email" />
                        <h4 class="mt-2 mb-2 text-xl">Password</h4>
                        <Password v-model="passwd" placeholder="Password" toggleMask />
                    </section>
                    <Button type="submit" label="Register" size="small" icon="pi pi-check" />

                </template>
            </Card>
        </form>
    </main>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Card from 'primevue/card';
import Button from 'primevue/button';

import { useLoginStore } from '@/stores/login.js'
import { storeToRefs } from 'pinia';

const store = useLoginStore()
const { email, passwd } = storeToRefs(store);
const { register } = store;


const handleRegister = async () => {
    register();
}


</script>