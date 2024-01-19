<template>
    <v-layout class="rounded rounded-md">
        <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
            <v-list-item prepend-icon="mdi-earth" title="John Leider" nav>
                <template v-slot:append>
                    <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
                </template>
            </v-list-item>
            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
                <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
                <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar title="Application bar"><template v-slot:append>
                <ThemeToggle></ThemeToggle>
            </template></v-app-bar>

        <v-main style="height: 250px"></v-main>
    </v-layout>
</template>

<script setup>
import ThemeToggle from './ThemeToggle.vue';
import { ref } from 'vue'
//import Cookies from 'js-cookie';

//const userMail = Cookies.get('user')
const drawer = ref(true)
const rail = ref(true)

</script>