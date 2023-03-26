<template>
    <main class="p-4 min-h-min">
        <Card>
            <template #header>
                <img class="w-auto h-60" :src="imgUrl" alt="">
            </template>
            <template #title>
                {{ title }}
            </template>
            <template #subtitle>
                {{ datetime }}
            </template>
            <template #content>
                {{ details }}
            </template>
            <template #footer>
                <Button v-if="!isRegistered" icon="pi pi-check" label="Register" @click="registerEvent" />
                <Button severity="success" v-else label="Download QR" @click="getImage">
                </Button>
                <!-- To be replaced with QR code -->

            </template>
        </Card>
        <Toast />
    </main>
</template>

<script setup>
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import Button from 'primevue/button';
import Card from 'primevue/card';

import { ref, onBeforeMount, toRefs } from 'vue';
import api from "@/stores/axiosUtils.js"

import { storeToRefs } from 'pinia';
import { useLoginStore } from '@/stores/login.js'
import { useRouter } from 'vue-router';
const router = useRouter()
const store = useLoginStore()
const { user } = storeToRefs(store);
const visible = ref(false)
const toast = useToast();
// const emit = defineEmits(['reloadEvents'])
const props = defineProps({
    eventId: String,
    imgUrl: String,
    title: String,
    datetime: String,
    details: String
})
const { eventId, imgUrl, title, datetime, details } = toRefs(props)

const emit = defineEmits(['showQR'])

const isRegistered = ref(false)
onBeforeMount(async () => {
    // Call API to check if currentUser(firebase check)
    // is already in registered list or not
    // Based on that, set isRegistered

    const { data } = await api.get(`/api/events/${eventId.value}`)
    isRegistered.value = data.participants.includes(user.value.id)
})

const registerEvent = async () => {
    // Call API to register currentUser(firebase check)
    // to event with eventId
    // On success -> set isregistered to true
    const data = {
        userId: user.value.id,
        eventId: eventId.value
    };
    // console.log(eventId.)
    await api.post('/api/events/register', data)
        .then(response => {
            toast.add({ severity: 'success', summary: 'Registration Successful', detail: 'Success', life: 3000 });
            setTimeout(() => {}, 3000);
        })
        .catch(error => {
            console.log(error);
        });
    
    router.go()
}


const getImage = async () => {
    const response = await api.get('/api/events/fetchTheQR',  { userID: user.value.id, eventID: eventId.value })
    emit('showQR', response.data);
}

</script>


<style scoped>
.p-card {
    height: min-content;
}
</style>