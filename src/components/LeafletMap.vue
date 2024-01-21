<template>
    <l-map ref="map" v-model:zoom="zoom" :center="[46.307636, 16.338257]" @click="addMarker">
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
            name="OpenStreetMap"></l-tile-layer>
        <l-marker v-for="marker in markers" :key="marker.id" :visible="marker.visible" :draggable="marker.draggable"
            :lat-lng="marker.position">
            <l-tooltip :content="marker.tooltip" />
        </l-marker>
    </l-map>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
//import { latLng } from 'leaflet'
import { ref } from 'vue';
import { LMap, LTileLayer, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";


const markers = [
    {
        id: 'm1',
        position: { lat: 46.307636, lng: 16.338257 },
        tooltip: 'Correct guess marker',
        draggable: true,
        visible: true,
    },
    {
        id: 'm2',
        position: { lat: 46.309178, lng: 16.342677 },
        tooltip: 'Your guess marker',
        draggable: true,
        visible: true,
    }
]

// const marker1LatLng = ref(latLng(46.307636, 16.338257))
// const marker2LatLng = ref(latLng(46.309178, 16.342677))

// function updateMarkerValues1() {
//     console.log(marker1LatLng.value.lat)
//     console.log(marker1LatLng.value.lng)
// }

// function updateMarkerValues2() {
//     console.log(marker2LatLng.value)
// }

const zoom = ref(14);
</script>

<style scoped></style>
