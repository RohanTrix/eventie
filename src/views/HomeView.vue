<template>
    <main class="relative m-20">
        <div>

            <nav class="flex items-center mt-4">
                <h1 class="text-green-500 text-2xl mr-6 font-medium">{{ user.email }}</h1>
                <Button label="Logout" icon="pi pi-sign-out" @click="handleLogout" />
            </nav>
            <div class="px-8 py-4">
                <h1 class="text-black text-3xl font-medium">All Events</h1>
            </div>
            <div class="grid grid-cols-4 gap-4 items-center justify-start pl-8">
                <EventCard v-for="event in events" :key="event.$id" :eventId="event.$id" :imgUrl="event.imageUrl"
                    :datetime="event.datetime" :title="event.name" :details="event.details" />
                <!-- <EventCard :eventId="2020" imgUrl="https://picsum.photos/id/237/200/300"
                    datetime="2 Jan 2022, 9:30PM" title="Party Time" details="Get ready to have fun" /> -->
            </div>
            <div class="px-8 py-4">
                <h1 class="text-black text-3xl font-medium">Registered Events</h1>
            </div>
            <div class="grid grid-cols-4 gap-4 items-center justify-start pl-8">
                <EventCard v-for="n in 4" :key="n" :eventId="null" imgUrl="https://picsum.photos/id/5/200/300"
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
const { user } = storeToRefs(store);
const { logout } = store;

const events = ref([{}])

onBeforeMount(async () => {
    // email -> [{}]
    const { data } = await api.get('/api/events', {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    })
    events.value = data.documents
    console.log(events)
})

const handleLogout = () => {
    logout();
}

</script>