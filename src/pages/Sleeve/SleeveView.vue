<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import SleeveTable from './components/SleeveTable.vue';
import { onMounted, ref } from 'vue';
import { type SleeveResponse, SleeveControllerApi } from '@/openapi';

const route = useRoute();
const router = useRouter();
const searchValue = ref<number>(Number(route.query.sleeveSequence));

const sleeveData = ref(<SleeveResponse[]>[]);
const sleeveApi = new SleeveControllerApi();

async function loadData(): Promise<SleeveResponse[]> {
  try {
    const response = await sleeveApi.getSleeveSequenceNumber(searchValue.value);

    if (response.status === 204) {
      return (sleeveData.value = []);
    }
    return (sleeveData.value = response.data);
  } catch (e) {
    console.error('Error', e);
    return [];
  }
}

function onSearch(newValue: number) {
  searchValue.value = newValue;
  router.push({ query: { ...route.query, sleeveSequence: newValue } });
  loadData();
}

onMounted(loadData);
</script>

<template>
  <v-sheet class="pa-8 elevation-4 rounded-lg" color="surface">
    <v-container>
      <SleeveTable :sleeves="sleeveData" :search-value="searchValue" @search="onSearch" />
    </v-container>
  </v-sheet>
</template>
