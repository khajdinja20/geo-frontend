<template>
    <v-container>
        <form @submit.prevent="submitLogin">
            <v-text-field prepend-inner-icon="mdi-email" v-model="email.value.value"
                :error-messages="email.errorMessage.value" label="E-mail"></v-text-field>

            <v-text-field type="password" prepend-inner-icon="mdi-lock" v-model="password.value.value"
                :error-messages="password.errorMessage.value" label="Password"></v-text-field>

            <v-btn color="green-darken-4" class="me-4" type="submit">
                Login
            </v-btn>

            <v-btn @click="handleReset">
                Clear
            </v-btn>
        </form>
    </v-container>
</template>

<script setup>
import { useField, useForm } from 'vee-validate';
import axios from 'axios';


const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        password(value) {
            if (value?.length > 9) return true

            return 'Password needs to be at least 8 characters.'
        },
        email(value) {
            if (/^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i
                .test(value)) return true

            return 'Must be a valid e-mail.'
        },
    },
})
const email = useField('email')
const password = useField('password')
const endpoint = 'login'

const submitLogin = handleSubmit(async values => {
    console.log(values);
    const sentData = JSON.stringify(values, null, 2)
    try {
        // Combine the endpoint with the base API URL
        const apiUrl = `http://localhost:4000/api/geotrainer/${endpoint}`;
        console.log(apiUrl);
        console.log(sentData);

        // Make a POST request to the API endpoint with the provided data
        const response = await axios.post(apiUrl, values);

        // Handle the API response
        console.log("API Response:", response.data);

        // Assuming the backend returns a user object on successful login
        const user = response.data;
        console.log(user)


        // For example, you can store the user data in the frontend state
        // this.$store.commit("setUser", user);

        // Redirect to another page or perform other actions after successful login
        // this.$router.push("/dashboard");
    } catch (error) {
        // Handle errors
        console.error("API Error:", error);

        // You can display an error message to the user or perform other error handling
        console.log("Login/Register failed. Please check your credentials and try again.");
    }
})
</script>