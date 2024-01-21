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
                                <!-- Other form fields remain unchanged -->

                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="guessPoint.value.value"
                                        :error-messages="guessPoint.errorMessage.value" label="Guess Point*"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="correctLocationPoint.value.value"
                                        :error-messages="correctLocationPoint.errorMessage.value"
                                        label="Correct Location Point*" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="style.value.value" :error-messages="style.errorMessage.value"
                                        label="Style"></v-text-field>
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
</template>
  
<script setup>
import { ref, defineProps } from 'vue'
const dialog = ref(false);

import { useField, useForm } from 'vee-validate';
import axios from 'axios';

const props = defineProps({
    gameId: {
        type: Number,
        required: true
    }
})

const guessPoint = useField('guessPoint');
const correctLocationPoint = useField('correctLocationPoint');
const style = useField('style');

const endpoint = 'rounds/create';

const { handleSubmit } = useForm();

const submitCreateRound = handleSubmit(async (values) => {
    values = { ...values, gameId: props.gameId };
    const sentData = JSON.stringify(values, null, 2);
    console.log(sentData);
    try {
        const apiUrl = `http://localhost:4000/api/geotrainer/${endpoint}`;
        const response = await axios.post(apiUrl, values);

        // Handle the API response
        console.log('API Response:', response.data);

        // Redirect or perform other actions after successful create round
        console.log('Round created successfully.');
        dialog.value = false;
    } catch (error) {
        // Handle errors
        console.error('API Error:', error);

        // Display an error message to the user or perform other error handling
        console.log('Create round failed. Please check your input and try again.');
    }
});
</script>
  