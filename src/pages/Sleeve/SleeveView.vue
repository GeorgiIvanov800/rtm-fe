<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import SleeveTable from './components/SleeveTable.vue';
import { onMounted, ref } from 'vue';
import { type SleeveResponse } from '@/openapi';
import { useLoadingStore } from '@/stores/loading';
import { getAllSleevesBySequenceNumber, deleteSleeve } from '@/services/sleeveService';
import { watch } from 'vue';


const route = useRoute();
const router = useRouter();
const searchValue = ref<number>(Number(route.query.sleeveSequence) || 0);
const isLoading = useLoadingStore();
const sleeveData = ref(<SleeveResponse[]>[]);
const error = ref<string | null>(null);



async function fetchSleeves() {

  isLoading.startLoading();
  error.value = null;
  try {
    sleeveData.value = await getAllSleevesBySequenceNumber(searchValue.value);
    if (sleeveData.value.length === 0) {
      return sleeveData.value = [];
    }
  } catch (err: any) {
    error.value = err.message;
  } finally {
    isLoading.stopLoading();
  }

}

function onSearch(newValue: number) {
  searchValue.value = newValue;
  router.push({ query: { ...route.query, sleeveSequence: newValue } });
}

function onRedirect(): void {
  router.push('/sleeves/create');
}

function onEdit(sleeveNumber: number) {
  router.push(`/sleeves/edit/${sleeveNumber}`);
}

function onDelete(sleeveId: number) {
  error.value = null;


}

onMounted(fetchSleeves);

watch(() => route.query.sleeveSequence,

  (newSeq, oldSeq) => {
    const seqNumber = Number(newSeq);
    if (isNaN(seqNumber)) {
      return;
    }
    searchValue.value = seqNumber;
    fetchSleeves();
  }
);
</script>

<template>
  <v-sheet class="pa-8 elevation-4 rounded-lg" color="surface">
    <v-container>
      <SleeveTable :sleeves="sleeveData" :search-value="searchValue" @search="onSearch" @redirect="onRedirect"
        @edit="onEdit" @delete="onDelete" />
    </v-container>
  </v-sheet>
</template>
