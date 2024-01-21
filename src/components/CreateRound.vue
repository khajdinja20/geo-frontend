<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn variant="text" icon="mdi-plus" color="green" size="small" v-bind="props"></v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Create Round</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <form @submit.prevent="submitCreateRound">
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="guessPoint.value.value"
                                        :error-messages="guessPoint.errorMessage.value" label="Guess Point*" readonly
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="correctLocationPoint.value.value"
                                        :error-messages="correctLocationPoint.errorMessage.value"
                                        label="Correct Location Point*" required readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="style.value.value" :error-messages="style.errorMessage.value"
                                        label="Style*" hint="Urban | Rural | Etc" required></v-text-field>
                                </v-col>
                            </v-row>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" @click="dialog = false">Close</v-btn>
                                <v-btn color="green-darken-4" class="me-4" variant="elevated" type="submit">Save</v-btn>
                            </v-card-actions>
                        </form>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
    <v-snackbar v-model="snackbar">
        {{ text }}

        <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="snackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>
  
<script setup>
import { ref, defineProps, watch } from 'vue'
const dialog = ref(false);

import { useField, useForm } from 'vee-validate';
import axios from 'axios';


const { handleSubmit } = useForm();

const props = defineProps({
    gameId: {
        type: Number,
        required: true
    },
    marker1Location: {
        type: Number,
        required: true
    },
    marker2Location: {
        type: Number,
        required: true
    }
})

const snackbar = ref(false);
const text = ref("Round created!");

var markerOneData = ref({
    type: "Point",
    coordinates: [props.marker1Location.lat, props.marker1Location.lng]
});
var markerTwoData = ref({
    type: "Point",
    coordinates: [props.marker2Location.lat, props.marker2Location.lng]
});

console.log(markerOneData.value.coordinates);
console.log(markerTwoData.value.coordinates);

const guessPoint = useField('guessPoint');
const correctLocationPoint = useField('correctLocationPoint');
const style = useField('style');

guessPoint.value = ref(markerOneData.value.coordinates.toString())
correctLocationPoint.value = ref(markerTwoData.value.coordinates.toString())

const endpoint = 'rounds/create';


const updateMarkerData = () => {
    markerOneData.value.coordinates = [props.marker1Location.lat, props.marker1Location.lng];
    markerTwoData.value.coordinates = [props.marker2Location.lat, props.marker2Location.lng];
    guessPoint.value.value = markerOneData.value.coordinates.toString();
    correctLocationPoint.value.value = markerTwoData.value.coordinates.toString();
};

watch([() => props.marker1Location, () => props.marker2Location], updateMarkerData, { immediate: true });



const submitCreateRound = handleSubmit(async () => {
    const gameId = props.gameId
    const customData = { guessPoint: markerOneData.value, correctLocationPoint: markerTwoData.value, style: style.value.value, gameId: gameId }

    const sentData = JSON.stringify(customData, null, 2);
    console.log(sentData);
    try {
        const apiUrl = `http://localhost:4000/api/geotrainer/${endpoint}`;
        const response = await axios.post(apiUrl, customData);

        // Handle the API response
        console.log('API Response:', response.data);

        // Redirect or perform other actions after successful create round
        console.log('Round created successfully.');
        snackbar.value = true;
        dialog.value = false;
    } catch (error) {
        // Handle errors
        console.error('API Error:', error);

        // Display an error message to the user or perform other error handling
        console.log('Create round failed. Please check your input and try again.');
    }
});
</script>
  