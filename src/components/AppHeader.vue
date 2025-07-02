<script setup lang="ts">
import AppAvatar from './AppAvatar.vue';

</script>
<template>
  <v-app-bar height="60" :elevation="22" color="#1565C0">
    <template v-slot:prepend>
      <v-toolbar-items>
        <v-btn icon to="/" tag="router-link">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-toolbar-items>
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
