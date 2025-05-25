<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <v-app>
    <AppHeader />
    <v-main>
      <RouterView />
    </v-main>
    <AppFooter />
  </v-app>
</template>
