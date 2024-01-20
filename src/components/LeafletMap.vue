<template>
    <l-map ref="map" v-model:zoom="zoom" :center="[46.307636, 16.338257]">
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
            name="OpenStreetMap"></l-tile-layer>
    </l-map>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import { ref } from 'vue';
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

const zoom = ref(14);
</script>

<style scoped></style>
