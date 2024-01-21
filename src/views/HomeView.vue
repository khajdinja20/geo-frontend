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
        <v-list-item type="subheader"><template v-slot:title>
            <h4 class="font-weight-bold">User games</h4>
            <v-divider></v-divider>
          </template></v-list-item>
        <v-list-item v-for="(game, index) in userGames" :key="index">
          <template v-slot:title>
            {{ game.name }} - {{ game.theme }}
          </template>
          <template v-slot:append>
            <CreateRound :game-id="game.id" :marker1Location="marker1Location" :marker2Location="marker2Location">
            </CreateRound>
            <!-- <v-btn variant="text" icon="mdi-plus" @click.stop="addGame"></v-btn> -->
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar title="Geo-Trainer"><template v-slot:append>
        <ThemeToggle></ThemeToggle>
      </template></v-app-bar>

    <v-main fluid style="height: 100vh;">
      <l-map ref="map" v-model:zoom="zoom" :center="[46.307636, 16.338257]" @click="addMarker">
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
          name="OpenStreetMap"></l-tile-layer>
        <l-marker :visible="true" :draggable="true" v-model:lat-lng="marker1Location"
          @dragend="onMarkerDragEnd(marker1Location)">
          <l-tooltip content="Your guess marker" />
        </l-marker>
        <l-marker :visible="true" :draggable="true" v-model:lat-lng="marker2Location"
          @dragend="onMarkerDragEnd(marker2Location)">
          <l-tooltip content="Correct guess marker" />
        </l-marker>
      </l-map>
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

// ------------------------ Leaflet map ------------------------
import "leaflet/dist/leaflet.css";
//import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";


const marker1Location = ref({ lat: 46.307636, lng: 16.338257 })
const marker2Location = ref({ lat: 46.309178, lng: 16.342677 })


const onMarkerDragEnd = (marker) => {
  console.log('Lat: ' + marker.lat + " Lng: " + marker.lng);
};

const zoom = ref(14);

</script>
