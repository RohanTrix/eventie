<template>
    <main class="grid place-items-center w-screen custom-bg-gradient overflow-visible">



        <div class="p-4 w-full h-screen  flex justify-center items-center">
            <div class="px-8 py-10 bg-white shadow-lg border-4 border-indigo-600 max-w-lg w-full h-auto rounded-md">

                <form @submit.prevent="handleRegister" class="space-y-6">
                    <div class="flex gap-x-2 items-center">
                        <div class="p-2 bg-indigo-600 rounded-md w-12 h-12">
                            <img src="https://cdn-icons-png.flaticon.com/512/124/124558.png" />
                        </div>
                        <h1 class="text-2xl text-gray-700 font-bold">Register Now</h1>
                    </div>
                    <div>

                        <label for="email" class="text-xs text-gray-500 font-medium tracking-wider uppercase">Email</label>
                        <input v-model="email" id="email" type="email" placeholder="johndoe@gmail.com"
                            class="mt-1.5 text-gray-800 bg-gray-100 w-full block px-4 py-3 rounded tracking-wide focus:outline-none focus:ring-2 focus:ring-gray-200">
                    </div>
                    <div>
                        <label for="password"
                            class="text-xs text-gray-500 font-medium tracking-wider uppercase">Password</label>
                        <input v-model="passwd" id="password" type="password" placeholder="********"
                            class="mt-1.5 text-gray-800 bg-gray-100 w-full block px-4 py-3 rounded tracking-wide focus:outline-none focus:ring-2 focus:ring-gray-200">
                    </div>
                    <button type="submit"
                        class="w-full my-2 px-4 py-3 text-sm bg-indigo-600 text-white uppercase font-semibold rounded-md focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-indigo-600 hover:bg-indigo-700">Register</button>

                </form>

            </div>

        </div>

    </main>
<!-- 
    <main class="h-full w-min flex items-center ">

        <form @submit.prevent="handleRegister">

            <Card>
                <template #header>
                    <img class="overflow-hidden" src="/images/event-login.jpg" alt="">
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
    </main> -->
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