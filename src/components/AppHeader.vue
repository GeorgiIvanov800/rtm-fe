<script setup lang="ts">
import AppAvatar from './AppAvatar.vue';

</script>
<template>
  <v-app-bar height="100" :elevation="22" color="#1565C0">
    <template v-slot:prepend>
      <v-app-bar-nav-icon>
        <v-btn icon to="/" tag="router-link">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-app-bar-nav-icon>
    </template>

    <v-app-bar-title text="Rüst Team Manager">
    </v-app-bar-title>


    <AppAvatar />

  </v-app-bar>
</template>

<style scoped>
.router-link-active {
  color: inherit !important;
  font-weight: normal !important;
  background: none !important;
}
</style>
