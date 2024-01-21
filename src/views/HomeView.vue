<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer v-model="drawer" rail-width="75" :rail="rail" permanent @click="rail = false">
      <template v-slot:append>
        <LogoutButton />
      </template>
      <v-list-item nav>
        <template v-slot:title>
          <h2 class="font-weight-bold">{{ userName }}</h2>
        </template>
        <template v-slot:prepend>
          <v-icon class="ml-2" icon="mdi-earth" color="primary" @click.stop="rail = !rail"></v-icon>
        </template>
        <template v-slot:append>
          <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>
      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-controller-classic" title="Games" value="home">
          <template v-slot:append>
            <CreateGame></CreateGame>
            <!-- <v-btn variant="text" icon="mdi-plus" @click.stop="addGame"></v-btn> -->
          </template>
        </v-list-item>
        <v-list-item>
          <h2>User Games</h2>
          <v-list density="compact">
            <v-list-item v-for="(game, index) in userGames" :key="index">
              {{ game.name }} - {{ game.theme }}
              <template v-slot:append>
                <CreateRound :game-id="game.id"></CreateRound>
                <!-- <v-btn variant="text" icon="mdi-plus" @click.stop="addGame"></v-btn> -->
              </template>
            </v-list-item>
          </v-list>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar title="Geo-Trainer"><template v-slot:append>
        <ThemeToggle></ThemeToggle>
      </template></v-app-bar>

    <v-main fluid style="height: 100vh;">
      <LeafletMap></LeafletMap>
      <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    </v-main>
  </v-layout>
</template>

<script setup>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import { ref, onMounted } from 'vue'
import Cookies from 'js-cookie';
import axios from 'axios';

import ThemeToggle from '@/components/ThemeToggle.vue';
import LogoutButton from '@/components/LogoutButton.vue'
import LeafletMap from '@/components/LeafletMap.vue';
import CreateGame from '@/components/CreateGame.vue'
import CreateRound from '@/components/CreateRound.vue'

const userMail = Cookies.get('user')
const userName = userMail ? userMail.split('@')[0] : '';
const drawer = ref(true)
const rail = ref(true)

const userGames = ref([]);

const endpoint = 'games'

onMounted(async () => {
  try {
    const apiUrl = `http://localhost:4000/api/geotrainer/${endpoint}/${userMail}`;
    const response = await axios.get(apiUrl);
    userGames.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching user games:', error);
  }
});

</script>
