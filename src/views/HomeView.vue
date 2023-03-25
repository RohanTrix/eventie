<template>
    <main>
        <div class="px-8 py-4">
            <h1 class="text-black text-3xl font-medium">Events</h1>
        </div>
        <div class="flex flex-wrap content-evenly min-h-[180px] items-center justify-start pl-8">
            <EventCard v-for="n in 5" :key="n" :eventId="null" imgUrl="https://picsum.photos/id/237/200/300" :datetime="null" :title="null"
                :details="null" />
        </div>
    </main>
</template>


<script setup>
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import EventCard from '../components/EventCard.vue';

import { useRouter } from 'vue-router';
import {getAuth} from "firebase/auth"
const auth = getAuth();
const router = useRouter();


onBeforeMount(() => {
    auth.onAuthStateChanged(user => {
        console.log(user);
    })
})

</script>