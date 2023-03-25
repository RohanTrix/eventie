<template>
    <form @submit.prevent="register">

        <Card>
            <template #header>
                <img class="overflow-hidden" src="src/assets/images/event-login.jpg" alt="">
            </template>
            <template #title>
                <h2 class="text decoration-solid text-2xl font-mono">Create an account</h2>
            </template>
            <template #content>
                <section class="mb-4">

                    <h4 class="mb-2 text-xl">Email</h4>
                    <InputText v-model="email" placeholder="Email" />
                    <h4 class="mt-2 mb-2 text-xl">Password</h4>
                    <Password v-model="passwd" placeholder="Password" toggleMask />
                </section>
                <Button type="submit" label="Register" size="small" icon="pi pi-check" />

            </template>
        </Card>
    </form>
</template>

<script setup>
import {ref} from 'vue'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
const email = ref('')
const passwd = ref('')

const auth = getAuth();
auth.onAuthStateChanged(user => {
    console.log(user);

})

const register = async () => {
    await createUserWithEmailAndPassword(auth, email.value, passwd.value).then((data) => {
        console.log('Sucess')

        toast.add({ severity: 'success', summary: 'Register Successful', detail: 'Register Success', life: 3000 });
        
        router.push('/')
    })
        .catch((error) => {
            toast.add({ severity: 'error', summary: 'Register Failed', detail: 'Please Register again', life: 3000 });
        })
}


</script>