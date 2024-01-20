<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn variant="text" icon="mdi-plus" color="green" size="small" v-bind="props">
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Create Game</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <form @submit.prevent="submitCreateGame">
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="name.value.value" :error-messages="name.errorMessage.value"
                                        label="Game name*" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="theme.value.value" :error-messages="theme.errorMessage.value"
                                        label="Theme" hint="Capitals | Africa | etc"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="datePlayed.value.value"
                                        :error-messages="datePlayed.errorMessage.value" type="date" label="Date played*"
                                        hint="Format: 24/12/2024" required></v-text-field>
                                </v-col>
                            </v-row>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" @click="dialog = false">
                                    Close
                                </v-btn>
                                <v-btn color="green-darken-4" class="me-4" variant="elevated" type="submit">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </form>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script setup>
import { ref } from 'vue'
const dialog = ref(false);

import { useField, useForm } from 'vee-validate';
import axios from 'axios';
import Cookies from 'js-cookie';

const { handleSubmit } = useForm();

const name = useField('name');
const datePlayed = useField('datePlayed');
const theme = useField('theme');
const userEmail = Cookies.get('user');


const endpoint = 'games/create';

const submitCreateGame = handleSubmit(async (values) => {
    console.log(values);
    console.log(userEmail);
    values = { ...values, userEmail };
    console.log(values);
    const sentData = JSON.stringify(values, null, 2);

    try {
        // Combine the endpoint with the base API URL
        const apiUrl = `http://localhost:4000/api/geotrainer/${endpoint}`;
        console.log(apiUrl);
        console.log(sentData);

        // Make a POST request to the API endpoint with the provided data
        const response = await axios.post(apiUrl, values);

        // Handle the API response
        console.log('API Response:', response.data);

        // Redirect to another page or perform other actions after successful create game
        console.log('Game created successfully.');
        dialog.value = false;
    } catch (error) {
        // Handle errors
        console.error('API Error:', error);

        // You can display an error message to the user or perform other error handling
        console.log('Create game failed. Please check your input and try again.');
    }
});
</script>