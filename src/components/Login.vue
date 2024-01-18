<template>
    <div>
        <v-container fill-height fluid>
            <v-container>
                <v-icon icon="mdi-earth" size="x-large"></v-icon>
                <h1>Geo-Trainer</h1>
            </v-container>
            <div class="d-flex align-center flex-column">
                <v-card max-width="1200" min-width="600">
                    <v-tabs v-model="tab" align-tabs="center" stacked color="green-darken-4">
                        <v-tab value="login"><v-icon>mdi-login</v-icon>Login</v-tab>
                        <v-tab value="register"><v-icon>mdi-account-plus</v-icon>Register</v-tab>
                    </v-tabs>
                    <v-card-text>
                        <v-window v-model="tab">
                            <v-window-item value="login">
                                <v-container>
                                    <form @submit.prevent="submit">
                                        <v-text-field prepend-inner-icon="mdi-email" v-model="emailLogin.value.value"
                                            :error-messages="emailLogin.errorMessage.value" label="E-mail"></v-text-field>

                                        <v-text-field type="password" prepend-inner-icon="mdi-lock"
                                            v-model="passwordLogin.value.value"
                                            :error-messages="passwordLogin.errorMessage.value"
                                            label="Password"></v-text-field>

                                        <AuthRequests :buttonText="'Login'" :requestData="apiData" :endpoint="'login'" />

                                        <v-btn @click="handleReset">
                                            Clear
                                        </v-btn>
                                    </form>
                                </v-container>
                            </v-window-item>
                            <v-window-item value="register">
                                <v-container>
                                    <form @submit.prevent="submit">
                                        <v-text-field prepend-inner-icon="mdi-account" v-model="nameRegister.value.value"
                                            :error-messages="nameRegister.errorMessage.value"
                                            label="Username"></v-text-field>

                                        <v-text-field type="password" prepend-inner-icon="mdi-lock"
                                            v-model="passwordRegister.value.value"
                                            :error-messages="passwordRegister.errorMessage.value"
                                            label="Password"></v-text-field>

                                        <v-text-field prepend-inner-icon="mdi-email" v-model="emailRegister.value.value"
                                            :error-messages="emailRegister.errorMessage.value"
                                            label="E-mail"></v-text-field>

                                        <AuthRequests :buttonText="'Register'" :requestData="apiData"
                                            :endpoint="'register'" />

                                        <v-btn @click="handleReset">
                                            Clear
                                        </v-btn>
                                    </form>
                                </v-container>
                            </v-window-item>
                        </v-window>
                    </v-card-text>
                </v-card>
            </div>
        </v-container>
    </div>
</template>

<script setup>
import { useField, useForm } from 'vee-validate'

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        nameRegister(value) {
            if (value?.length >= 2) return true

            return 'Name needs to be at least 2 characters.'
        },
        passwordRegister(value) {
            if (value?.length > 9) return true

            return 'Password needs to be at least 8 characters.'
        },
        emailRegister(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

            return 'Must be a valid e-mail.'
        },

        passwordLogin(value) {
            if (value?.length > 9) return true

            return 'Password needs to be at least 8 characters.'
        },
        emailLogin(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

            return 'Must be a valid e-mail.'
        },

    },
})
const nameRegister = useField('nameRegister')
const passwordRegister = useField('passwordRegister')
const emailRegister = useField('emailRegister')

const emailLogin = useField('emailLogin')
const passwordLogin = useField('passwordLogin')


const submit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2))
})
</script>

<script>
import AuthRequests from './AuthRequests.vue';

export default {
    name: 'LoginPage', data: () => ({
        tab: null,
    }),
    components: {
        AuthRequests
    },
    formData() {
        return {
            apiData: {
                // Your custom API request data here
                key: "value"
            }
        };
    }
};
</script>
