<template>
    <v-btn color="secondary" variant="tonal" size="x-small" icon="mdi-logout" @click="logOut"></v-btn>
</template>
  
<script setup>
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
const router = useRouter()

function logOut() {
    console.log(Cookies.get('user'))
    Cookies.remove('user')
    router.push('/')
}
</script>
  