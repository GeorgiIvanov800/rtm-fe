<script setup lang="ts">
import { useRoute } from 'vue-router';
import SleeveTable from './components/SleeveTable.vue';

const route = useRoute();

const queryValue = route.query.sleeveSequence;
const sequenceNumber: number = Number(queryValue);
</script>

<template>
  <h1>Sleeve View Works</h1>
  <h2>{{ queryValue }}</h2>
  <SleeveTable :sequenceNumber="sequenceNumber" />
</template>
