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
                                <form-login></form-login>
                            </v-window-item>
                            <v-window-item value="register">
                                <form-register></form-register>
                            </v-window-item>
                        </v-window>
                    </v-card-text>
                </v-card>
            </div>
        </v-container>
    </div>
</template>

<script setup>
import FormLogin from './FormLogin.vue';
import FormRegister from './FormRegister.vue';
</script>

<script>
export default {
    name: 'LoginPage', data: () => ({
        tab: null,
    }),
    components: {
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
