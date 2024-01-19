<template>
    <v-btn :icon="getThemeIcon" @click="toggleTheme"></v-btn>
</template>
  
<script setup>
import { useTheme } from 'vuetify'
import { computed } from 'vue'

const theme = useTheme()

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const getThemeIcon = computed(() => {
    return theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'
})
</script>
  