<template>
  <v-btn class="me-4" type="submit" color="green-darken-4" @click="makeApiRequest">{{ buttonText }}</v-btn>
</template>

<script>
import axios from "axios";

export default {
  props: {
    endpoint: {
      type: String,
      required: true
    },
    requestData: {
      type: Object,
      default: () => ({})
    },
    buttonText: {
      type: String,
      default: "Make API Request"
    }
  },
  methods: {
    async makeApiRequest() {
      try {
        // Combine the endpoint with the base API URL
        const apiUrl = `http://localhost:4000/api/geotrainer/${this.endpoint}`;
        console.log(apiUrl);
        console.log(this.requestData);

        // Make a POST request to the API endpoint with the provided data
        const response = await axios.post(apiUrl, this.requestData);

        // Handle the API response
        console.log("API Response:", response.data);

        // Assuming the backend returns a user object on successful login
        const user = response.data;

        // For example, you can store the user data in the frontend state
        this.$store.commit("setUser", user);

        // Redirect to another page or perform other actions after successful login
        this.$router.push("/dashboard");
      } catch (error) {
        // Handle errors
        console.error("API Error:", error);

        // You can display an error message to the user or perform other error handling
        this.errorMessage = "Login/Register failed. Please check your credentials and try again.";
      }
    }
  }

};
</script>

