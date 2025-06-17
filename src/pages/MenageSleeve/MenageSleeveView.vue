<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import SleeveForm from './components/SleeveForm.vue';
import { saveSleeve, getSleeveBySleeveNumber } from '@/services/sleeveService';
import type { SaveSleeveRequest } from '@/openapi';
import { computed, ref } from 'vue';
import { onMounted } from 'vue';
import { useLoadingStore } from '@/stores/loading';


const route = useRoute();
const router = useRouter();
const isLoading = useLoadingStore();
const error = ref<string | null>(null);

const isEdit = computed(() => Boolean(route.params.id));

onMounted(() => {
  if (isEdit.value) {
    const sleeveNumber = Number(route.params.id);
    getSleeve(sleeveNumber);
  }
});

async function handleSave(payload: SaveSleeveRequest): Promise<void> {
  isLoading.startLoading();
  error.value = null;
  try {
    const created = await saveSleeve(payload);
  } catch (err: any) {
    error.value = err.message;

  } finally {
    isLoading.stopLoading();
  }
}

async function getSleeve(sleeveNumber: number) {
  try {
    console.log("FETCH SLEEVE ");
    const editSleeve = await getSleeveBySleeveNumber(sleeveNumber);
    console.log(editSleeve);
  }
  catch (err: any) {
    console.log(error);
  }
}

</script>


<template>
  <div v-if="error" class="text-red-500">{{ error }}</div>
  <SleeveForm @save="handleSave" />
</template>
