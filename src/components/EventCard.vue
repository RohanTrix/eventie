<template>
    <main class="p-4 min-h-min">
        <Card>
            <template #header>
                <img :src="imgUrl" alt="">
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
                <Button v-if="!isRegistered" icon="pi pi-check" label="Register" @click="registerEvent"/>
                <Button v-else label="Submit" disabled />
                <!-- To be replaced with QR code -->
            </template>
        </Card>

    </main>
</template>

<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';
import {ref, onBeforeMount } from 'vue';

const isRegistered = ref(false)
onBeforeMount(() => {
    // Call API to check if currentUser(firebase check)
    // is already in registered list or not
    // Based on that, set isRegistered
})

const registerEvent = () => {
    // Call API to register currentUser(firebase check)
    // to event with eventId
    // On success -> set isregistered to true
}

const props = defineProps({
    eventId: String,
    imgUrl: String,
    title: String,
    datetime: String,
    details: String
})

</script>


<style scoped>

.p-card {
    height: min-content;
}

</style>