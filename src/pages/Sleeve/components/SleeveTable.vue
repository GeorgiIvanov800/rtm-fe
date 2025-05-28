<script setup lang="ts">
import { SleeveControllerApi } from '@/openapi';
import { tr } from 'vuetify/locale';

const props = defineProps<{
  sequenceNumber?: number;
}>();

const number = Number(props.sequenceNumber);

const sleeveApi = new SleeveControllerApi();
const testNumber: number = 1002;
async function getSleevesBySequenceNumber() {
  console.log("Clicked");
  try {
    const response = await sleeveApi.getSleeveSequenceNumber(testNumber);
    console.log('res', response.data);
    return response.data;
  } catch (e) {
    console.error('Opps unexpected', e);
    return [];
  }
}

</script>

<template>
  <h1>Sleeve Table Works</h1>
  <p>{{ sequenceNumber }}</p>
  <h1>{{ sequenceNumber }}</h1>
  <v-btn @click="getSleevesBySequenceNumber" prepend-icon="$vuetify" variant="tonal">
    Button
  </v-btn>
</template>
