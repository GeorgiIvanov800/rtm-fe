<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import SleeveTable from './components/SleeveTable.vue';
import { onMounted, ref, watch, inject } from 'vue';
import { type SleeveResponse } from '@/openapi';
import { useLoadingStore } from '@/stores/loading';
import { getAllSleevesBySequenceNumber, deleteSleeve } from '@/services/sleeveService';
import { isAxiosError, type AxiosError } from 'axios';
import { useDialogStore } from '@/stores/dialogStore';
import { IsAdminKey } from '@/main';


const route = useRoute();
const router = useRouter();
const searchValue = ref<number>(Number(route.query.sleeveSequence) || 0);
const isLoading = useLoadingStore();
const sleeveData = ref(<SleeveResponse[]>[]);
const error = ref<string | null>(null);
const dialogStore = useDialogStore();
const isAdmin = inject(IsAdminKey, false);


async function fetchSleeves() {

  isLoading.startLoading();
  error.value = null;
  try {
    sleeveData.value = await getAllSleevesBySequenceNumber(searchValue.value);
    if (sleeveData.value.length === 0) {
      return sleeveData.value = [];
    }
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      error.value = err.message;
    }
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

async function onDelete(sleeveId: number) {
  error.value = null;

  try {
    isLoading.startLoading();
    await deleteSleeve(sleeveId);
    dialogStore.showDialog("Erfolgreich!", "Sleeve erfolgreich gelöscht.", 'success');
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const message = error.value = err.response?.data.message;
      dialogStore.showDialog('Error', message, 'error');
    }

  } finally {
    isLoading.stopLoading();
  }

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
        @edit="onEdit" @delete="onDelete" :is-admin="isAdmin"/>
    </v-container>
  </v-sheet>
</template>
