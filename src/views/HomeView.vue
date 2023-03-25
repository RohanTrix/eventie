<template>
    <main class="relative m-20">
        <div>

            <nav class="flex items-center mt-4">
                <h1 class="text-green-500 text-2xl mr-6 font-medium">{{ user.email }}</h1>
                <span class="p-buttonset">
                    <Button label="Create Event" icon="pi pi-plus" @click="visible=true" />
                    <Button label="Logout" icon="pi pi-sign-out" @click="handleLogout" />
                </span>
            </nav>
            <div class="px-8 py-4">
                <h1 class="text-black text-3xl font-medium">Available Events</h1>
            </div>
            <div class="grid grid-cols-4 gap-4 items-center justify-start pl-8">
                <EventCard v-for="event in availableEvents" :key="event.$id" :eventId="event.$id" :imgUrl="event.imageUrl"
                    :datetime="event.datetime" :title="event.name" :details="event.details" />
            </div>
            <div class="px-8 py-4">
                <h1 class="text-black text-3xl font-medium">Registered Events</h1>
            </div>
            <div class="grid grid-cols-4 gap-4 items-center justify-start pl-8">
                <EventCard v-for="event in registeredEvents" :key="event.$id" :eventId="event.$id" :imgUrl="event.imageUrl"
                    :datetime="event.datetime" :title="event.name" :details="event.details" />
            </div>
        </div>
        <!-- Create Event Modal -->
        <Dialog v-model:visible="visible" modal header="🎉 Create an Event!" :style="{ width: '50vw' }">
            <CreateEventView />
        </Dialog>
    </main>
</template>


<script setup>

import EventCard from '../components/EventCard.vue';
import CreateEventView from '@/views/CreateEventView.vue'
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

import { storeToRefs } from 'pinia';
import { useLoginStore } from '@/stores/login.js'

import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import api from "@/stores/axiosUtils.js"

const router = useRouter();

const store = useLoginStore()
const { user } = storeToRefs(store);



const { logout } = store;
const visible = ref(false)


const availableEvents = ref(null)
const registeredEvents = ref(null)
const reloadEvents = async () => {
    const { data } = await api.get('/api/events', {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    })
    registeredEvents.value = data.documents.filter(event => event.participants.includes(user.value.id))
    availableEvents.value = data.documents.filter(event => !event.participants.includes(user.value.id))
}

onBeforeMount(async () => {
    // email -> [{}]
    reloadEvents()
    // console.log(events)
})

const handleLogout = () => {
    logout();
}

</script>

<style scoped></style>