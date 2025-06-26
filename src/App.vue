<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { useLoadingStore } from './stores/loading';
import AppLoader from './components/AppLoader.vue';
import { storeToRefs } from 'pinia';
import AppDialog from './components/AppDialog.vue';


const store = useLoadingStore();
const { isLoading } = storeToRefs(store);

</script>

<template>
  <v-app>
    <AppHeader />
    <v-main>
      <AppLoader :is-loading="isLoading" />
      <RouterView />
      <AppDialog />
    </v-main>
    <AppFooter />
  </v-app>
</template>
