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
            <v-icon v-if="index === worstGameIndex" class="worst-game-icon" color="red">mdi-alert</v-icon>
            {{ game.name }} - {{ game.theme }}
          </template>
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-map-marker-multiple" color="primary" size="small"
              @click="toggleRounds(index)">
            </v-btn>
            <CreateRound :game-id="game.id" :marker1Location="marker1Location" :marker2Location="marker2Location">
            </CreateRound>
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
    <v-dialog v-model="roundsDialog" persistent width="600">
      <v-card>
        <v-card-title>
          <span class="text-h5">Game Rounds</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeRoundsDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="(round, roundIndex) in currentRounds" :key="roundIndex">
              <template v-slot:title>
                {{ `Round ${roundIndex + 1}` }}
                <v-icon v-if="roundIndex === worstRoundIndex" class="worst-round-icon" color="red">mdi-alert</v-icon>
              </template>
              <template v-slot:subtitle>
                Score: {{ round.score }} | Style: {{ round.style }}
              </template>
              <template v-slot:append>
                <v-btn type="icon" variant="outlined" color="primary" icon="mdi-map"
                  @click="moveMarkersToRound(round)"></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script setup>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import { ref, onMounted, computed } from 'vue'
import Cookies from 'js-cookie';
import axios from 'axios';

import ThemeToggle from '@/components/ThemeToggle.vue';
import LogoutButton from '@/components/LogoutButton.vue'
import CreateGame from '@/components/CreateGame.vue'
import CreateRound from '@/components/CreateRound.vue'
//import RoundList from '@/components/RoundList.vue';

const userMail = Cookies.get('user')
const userName = userMail ? userMail.split('@')[0] : '';
const drawer = ref(true)
const rail = ref(true)

// ---------------- Games list ----------------
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

const worstGameIndex = computed(() => {
  if (userGames.value.length === 0) {
    return -1;
  }

  // Find the index of the game with the largest distance in worstRoundInfo
  return userGames.value.reduce((maxIndex, game, currentIndex) => {
    const distance = game.worstRoundInfo ? game.worstRoundInfo.distance : 0;
    const maxDistance = userGames.value[maxIndex]?.worstRoundInfo?.distance || 0;
    return distance > maxDistance ? currentIndex : maxIndex;
  }, 0);
});

// ------------------------ Leaflet map ------------------------
import "leaflet/dist/leaflet.css";
//import { L } from 'leaflet'
import { LMap, LTileLayer, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";


const marker1Location = ref({ lat: 46.307636, lng: 16.338257 })
const marker2Location = ref({ lat: 46.309178, lng: 16.342677 })


const onMarkerDragEnd = (marker) => {
  console.log('Lat: ' + marker.lat + " Lng: " + marker.lng);
};

const zoom = ref(14);

//-------------- Rounds list --------------------
const gameRounds = ref([]);

const roundsDialog = ref(false);
const currentRounds = ref([]);

const worstRoundIndex = computed(() => {
  if (currentRounds.value.length === 0) {
    return -1;
  }

  // Find the index of the round with the lowest score
  return currentRounds.value.reduce((minIndex, round, currentIndex) => {
    return round.score < currentRounds.value[minIndex].score ? currentIndex : minIndex;
  }, 0);
});

const toggleRounds = async (index) => {
  if (!gameRounds[index]) {
    try {
      const apiUrl = `http://localhost:4000/api/geotrainer/rounds/${userGames.value[index].id}`;
      const response = await axios.get(apiUrl);
      gameRounds[index] = response.data;
      currentRounds.value = gameRounds[index];
      console.log(gameRounds[index]);
      openRoundsDialog();
    } catch (error) {
      console.error('Error fetching rounds:', error);
    }
  } else {
    currentRounds.value = gameRounds[index];
    openRoundsDialog();
  }
};

const openRoundsDialog = () => {
  roundsDialog.value = true;
};

const closeRoundsDialog = () => {
  roundsDialog.value = false;
};

const moveMarkersToRound = (round) => {
  // Update marker1Location and marker2Location with the coordinates from the selected round
  marker1Location.value = { lat: round.guessPoint.coordinates[0], lng: round.guessPoint.coordinates[1] };
  marker2Location.value = { lat: round.correctLocationPoint.coordinates[0], lng: round.correctLocationPoint.coordinates[1] };
  roundsDialog.value = false;
};


</script>
