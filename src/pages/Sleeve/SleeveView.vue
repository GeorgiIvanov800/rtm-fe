<script setup lang="ts">
import { useRoute } from 'vue-router';
import SleeveTable from './components/SleeveTable.vue';

const route = useRoute();

const queryValue = route.query.sleeveSequence;
const sequenceNumber: number = Number(queryValue);
</script>

<template>
  <v-sheet class="pa-8 elevation-4 rounded-lg" color="surface">
    <v-container>
      <SleeveTable :sequenceNumber="sequenceNumber" />
    </v-container>
  </v-sheet>
</template>
