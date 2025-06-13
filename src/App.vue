<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { useLoadingStore } from './stores/loading';
import AppLoader from './components/AppLoader.vue';
import { storeToRefs } from 'pinia';


const store = useLoadingStore();
const { isLoading } = storeToRefs(store);

</script>

<template>
  <v-app>
    <AppHeader />
    <v-main>
      <AppLoader :is-loading="isLoading" />
      <RouterView />
    </v-main>
    <AppFooter />
  </v-app>
</template>
