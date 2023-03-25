<template>
    <main class="relative m-20">
        <div>

            <nav class="flex items-center mt-4">
                <h1 class="text-green-500 text-2xl mr-6 font-medium">RohanTrix</h1>
                <Button label="Logout" icon="pi pi-sign-out" @click="handleLogout" />
            </nav>
            <div class="px-8 py-4">
                <h1 class="text-black text-3xl font-medium">All Events</h1>
            </div>
            <div class="grid grid-cols-4 gap-4 items-center justify-start pl-8">
                <EventCard v-for="n in 4" :key="n" :eventId="null" imgUrl="https://picsum.photos/id/237/200/300"
                    :datetime="null" :title="null" :details="null" />
                <!-- <EventCard :eventId="2020" imgUrl="https://picsum.photos/id/237/200/300"
                    datetime="2 Jan 2022, 9:30PM" title="Party Time" details="Get ready to have fun" /> -->
            </div>
            <div class="px-8 py-4">
                <h1 class="text-black text-3xl font-medium">Registered Events</h1>
            </div>
            <div class="grid grid-cols-4 gap-4 items-center justify-start pl-8">
                <EventCard v-for="n in 4" :key="n" :eventId="null" imgUrl="https://picsum.photos/id/237/200/300"
                    :datetime="null" :title="null" :details="null" />
                <!-- <EventCard :eventId="2020" imgUrl="https://picsum.photos/id/237/200/300"
                datetime="2 Jan 2022, 9:30PM" title="Party Time" details="Get ready to have fun" /> -->
            </div>
        </div>
    </main>
</template>


<script setup>
import EventCard from '../components/EventCard.vue';

import Button from 'primevue/button';

import { storeToRefs } from 'pinia';
import { useLoginStore } from '@/stores/login.js'

import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import api from "@/stores/axiosUtils.js"

const router = useRouter();
const store = useLoginStore()
const { logout } = store;

const events = ref([{}])

onBeforeMount(() => {
    // email -> [{}]
    
})

const handleLogout = () => {
    logout();
}

</script>