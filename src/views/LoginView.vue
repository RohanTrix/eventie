<template>
    <main class="grid place-items-center w-screen custom-bg-gradient overflow-visible">



        <div class="p-4 w-full h-screen  flex justify-center items-center">
            <div class="px-8 py-10 bg-white shadow-lg border-4 border-indigo-600 max-w-lg w-full h-auto rounded-md">

                <form @submit.prevent="handleLogin" class="space-y-6">
                    <div class="flex gap-x-2 items-center">
                        <div class="p-2 bg-indigo-600 rounded-md w-12 h-12">
                            <img src="https://cdn-icons-png.flaticon.com/512/124/124558.png" />
                        </div>
                        <h1 class="text-2xl text-gray-700 font-bold">Welcome Back</h1>
                    </div>
                    <div>
                        
                        <label for="email"
                            class="text-xs text-gray-500 font-medium tracking-wider uppercase">Email</label>
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
                        class="w-full my-2 px-4 py-3 text-sm bg-indigo-600 text-white uppercase font-semibold rounded-md focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-indigo-600 hover:bg-indigo-700">Login</button>
                    <div class="w-full text-gray-600 text-sm text-center">
                        Don't have an account?
                        <RouterLink to="/register" class="text-medium text-indigo-600 hover:underline">
                            Register Now!
                        </RouterLink>
                    </div>
                </form>

            </div>

        </div>

    </main>
</template>

<script setup>
import { ref } from "vue"

import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { RouterLink } from "vue-router";


import { useLoginStore } from '@/stores/login'
import { storeToRefs } from 'pinia';

const store = useLoginStore()
const { email, passwd } = storeToRefs(store);
const { login } = store;


const handleLogin = async () => {
    login();
}

</script>


<style>
.custom-bg-gradient {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
	height: 100vh;
}

@keyframes gradient {
    0% {
		background-position: 0% 50%;
	}
	50% {
        background-position: 100% 50%;
	}
	100% {
        background-position: 0% 50%;
	}
}

</style>