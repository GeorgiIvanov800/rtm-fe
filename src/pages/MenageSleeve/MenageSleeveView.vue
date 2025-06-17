<script lang="ts" setup>
import { useRoute } from 'vue-router';
import SleeveForm from './components/SleeveForm.vue';
import { saveSleeve, getSleeveBySleeveNumber } from '@/services/sleeveService';
import type { SaveSleeveRequest } from '@/openapi';
import { computed, ref } from 'vue';
import { onMounted } from 'vue';
import { useLoadingStore } from '@/stores/loading';


const route = useRoute();
const loadingStore = useLoadingStore();
const error = ref<string | null>(null);
const isEdit = computed(() => Boolean(route.params.id));
const sleeveToEdit = ref<SaveSleeveRequest | null>(null);

onMounted(() => {
  if (isEdit.value) {
    const sleeveNumber = Number(route.params.id);
    getSleeve(sleeveNumber);
  }
});

async function handleSave(payload: SaveSleeveRequest): Promise<void> {
  loadingStore.startLoading();
  error.value = null;
  try {
    const created = await saveSleeve(payload);
  } catch (err: any) {
    error.value = err.message;

  } finally {
    loadingStore.stopLoading();
  }
}

async function getSleeve(sleeveNumber: number) {
  loadingStore.startLoading();
  error.value = null;
  try {
    sleeveToEdit.value = await getSleeveBySleeveNumber(sleeveNumber);
  }
  catch (err: any) {
    error.value = err.message;
  } finally {
    loadingStore.stopLoading();
  }
}

</script>


<template>
  <div v-if="error" class="text-red-500">{{ error }}</div>
  <div v-if="loadingStore.isLoading">
  </div>
  <SleeveForm v-else @save="handleSave" :initial-data="sleeveToEdit" />
</template>
