<script setup>
import Message from "primevue/message"
</script>


<template>
    <div class="p-8 h-[50%] flex items-center justify-center">
        <Message severity="error" :closable="false">Error <span class="font-mono font-bold">404</span> Page Does Not Exist</Message>
    </div>
</template>
