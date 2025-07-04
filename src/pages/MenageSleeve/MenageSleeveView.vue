<script lang="ts" setup>
import { useRoute } from 'vue-router';
import SleeveForm from './components/SleeveForm.vue';
import { saveSleeve, getSleeveBySleeveNumber, updateSleeve } from '@/services/sleeveService';
import type { SaveSleeveRequest, SleeveResponse } from '@/openapi';
import { computed, ref, onMounted } from 'vue';
import { useLoadingStore } from '@/stores/loading';
import { useDialogStore } from '@/stores/dialogStore';
import axios, { isAxiosError } from 'axios';


const route = useRoute();
const loadingStore = useLoadingStore();
const error = ref<string | null>(null);
const isEdit = computed(() => Boolean(route.params.id));
const sleeveToEdit = ref<SleeveResponse | null>(null);
const dialogStore = useDialogStore();


onMounted(() => {
  if (isEdit.value) {
    const sleeveNumber = Number(route.params.id);
    getSleeve(sleeveNumber);
  }
});

async function handleSave(payload: SaveSleeveRequest): Promise<void> {
  error.value = null;

  if (isEdit.value) {
    return;
  }

  try {
    await saveSleeve(payload);
    dialogStore.showDialog('Erfolgreich!', 'Sleeve erfolgreich angelegt - weiter geht’s!', 'success');
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const message = err.response?.data?.message;
      error.value = message;
      dialogStore.showDialog('Error', message, 'error');
    } else if (err instanceof Error) {
      error.value = err.message;
      dialogStore.showDialog('Error', 'Unexpected Error Please', 'error');
    }
  } finally {
    loadingStore.stopLoading();
  }
}

async function getSleeve(sleeveNumber: number) {
  loadingStore.startLoading();
  error.value = null;
  try {
    sleeveToEdit.value = await getSleeveBySleeveNumber(sleeveNumber);
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      error.value = err.message;
    }
  } finally {
    loadingStore.stopLoading();
  }
}

async function handleUpdate(payload: Partial<SaveSleeveRequest>): Promise<void> {
  loadingStore.startLoading();
  const sleeveId = sleeveToEdit.value?.id;
  error.value = null;
  if (sleeveId === undefined) {
    error.value = "Cannot update sleeve: Sleeve ID is missing.";
    dialogStore.showDialog('Critical Error', error.value, 'error');
    loadingStore.stopLoading();
    return;
  }
  try {
    await updateSleeve(sleeveId, payload);
    dialogStore.showDialog('Erfolgreich!', 'Update erledigt - dein Sleeve ist frisch!', 'success');
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const message = err.response?.data?.message;
      error.value = message;
      dialogStore.showDialog('Error', message, 'error');
    } else if (err instanceof Error) {
      error.value = err.message;
      dialogStore.showDialog('Error', 'Unexpected Error', 'error');
    }
  } finally {
    loadingStore.stopLoading();
  }
}
</script>

<template>
  <div v-if="loadingStore.isLoading"></div>
  <SleeveForm v-else @save="handleSave" :initial-data="sleeveToEdit" @update="handleUpdate" />
</template>
