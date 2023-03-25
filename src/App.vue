<script setup>
import { RouterView, useRouter } from "vue-router"
import { useLoginStore } from '@/stores/login'
import { onMounted } from "vue";
const router = useRouter();


const store = useLoginStore()

onMounted(() => {
  store.init();
})



</script>

<template>
  <RouterView />
</template>

<style>
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
}

</style>
