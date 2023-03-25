<template>
    <main class="fixed left-10">
        <nav class="flex items-center mt-4">
            <h1 class="text-green-500 text-2xl mr-6 font-medium">RohanTrix</h1>
            <Button label="Logout" icon="pi pi-sign-out" @click="handleLogout"/>
        </nav>
        <div class="px-8 py-4">
            <h1 class="text-black text-3xl font-medium">Events</h1>
        </div>
        <div class="flex flex-wrap content-evenly min-h-[180px] items-center justify-start pl-8">
            <EventCard v-for="n in 5" :key="n" :eventId="null" imgUrl="https://picsum.photos/id/237/200/300"
                :datetime="null" :title="null" :details="null" />
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

const router = useRouter();
const store = useLoginStore()
const { email, passwd } = storeToRefs(store);
const { logout } = store;

const handleLogout =() => {
       logout();
}

</script>