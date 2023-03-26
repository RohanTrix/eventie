<template>
    <main class="relative mx-20 my-3">
        <div>

            <nav class=" flex justify-between mt-2">

                <div class="flex items-center">
                    <i style="font-size: 2rem" class="pi pi-calendar-plus"></i>
                    <RouterLink to="/">

                        <h1 class="text-green-500 text-2xl ml-2 mr-6 font-medium">Eventie</h1>
                    </RouterLink>
                </div>
                <!-- <span class="p-buttonset"> -->
                <div class="flex flex-col items-center">

                    <h1 class="text-green-500 text-2xl pb-2 underline font-medium cursor-pointer">{{ user.email }}</h1>

                    <div class="flex items-center">
                        <Button label="Create Event" icon="pi pi-plus" @click="visible = true" />
                        <div class="px-3"></div>
                        <Button label="Logout" icon="pi pi-sign-out" @click="handleLogout" />

                    </div>
                </div>
                <!-- </span> -->
            </nav>
            <section>

                <div class="px-8 py-4">
                    <h1 class="text-4xl font-extrabold text-blue-600 dark:text-blue-500"><span
                            class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Available
                            Events</span></h1>
                </div>
                <div class="grid grid-cols-4 gap-4 items-center justify-start pl-8">
                    <EventCard v-for="event in availableEvents" :key="event.$id" :eventId="event.$id"
                        :imgUrl="event.imageUrl" :datetime="event.datetime" :title="event.name" :details="event.details" />
                </div>
            </section>
            <div class="px-8 py-4">
                <h1 class="text-4xl font-extrabold text-blue-600 dark:text-blue-500"><span
                        class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Registered
                        Events</span></h1>
            </div>
            <div class="grid grid-cols-4 gap-4 items-center justify-start pl-8">
                <EventCard @showQR="showModalQr" v-for="event in registeredEvents" :key="event.$id" :eventId="event.$id"
                    :imgUrl="event.imageUrl" :datetime="event.datetime" :title="event.name" :details="event.details" />
            </div>
        </div>
        <!-- Create Event Modal -->
        <Dialog v-model:visible="visible" modal header="🎉 Create an Event!" :style="{ width: '50vw' }">
            <CreateEventView @eventCreated="eventCreated" />
        </Dialog>
        <Dialog v-model:visible="qrVisible" modal header="📷 QR Code" :style="{ width: '30' }">
            <img :src="QRCodeImg" alt="">
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

import api from "@/stores/axiosUtils.js"

const store = useLoginStore()
const { user } = storeToRefs(store);



const { logout } = store;
const visible = ref(false)
const qrVisible = ref(false)

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
const eventCreated = async () => {
    visible.value = !visible.value
    await reloadEvents();
}
const QRCodeImg = ref('')
const showModalQr = (imgData) => {
    qrVisible.value = true
    QRCodeImg.value = imgData
    // console.log(QRCodeImg)
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