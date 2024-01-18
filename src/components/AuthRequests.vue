<template>
  <v-btn color="green-darken-4" @click="makeApiRequest">{{ buttonText }}</v-btn>
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
    makeApiRequest() {
      // Combine the endpoint with the base API URL
      const apiUrl = `http://localhost:4000/api/geotrainer/${this.endpoint}`;
      console.log(this.endpoint);
      console.log(apiUrl);

      // Make a POST request to the API endpoint with the provided data
      axios.post(apiUrl, this.requestData)
        .then(response => {
          // Handle the API response
          console.log("API Response:", response.data);
        })
        .catch(error => {
          // Handle errors
          console.error("API Error:", error);
        });
    }
  }
};
</script>

