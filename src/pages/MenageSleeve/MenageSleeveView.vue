<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import SleeveForm from './components/SleeveForm.vue';
import { saveSleeve } from '@/services/sleeveService';
import type { SaveSleeveRequest } from '@/openapi';
import { computed, ref } from 'vue';
import { onMounted } from 'vue';
import { useLoadingStore } from '@/stores/loading';


const route = useRoute();
const router = useRouter();
const isLoading = useLoadingStore();
const error = ref<string | null>(null);

const isEdit = computed(() => Boolean(route.params.id));
// const original = computed(() => sleeves.value.find(sleeve => sleeve.id === Number(route.params.id)));

function handleSave(payload: SaveSleeveRequest): void {
  isLoading.startLoading();
  error.value = null;
  try {
    saveSleeve(payload);
  } catch (err: any) {
    error.value = err.message;

  } finally {
    isLoading.stopLoading();
  }
}


</script>


<template>
  <h1>{{ isEdit ? 'Edit Sleeve' : 'Neu Sleeve' }}</h1>
  <div v-if="error" class="text-red-500">{{ error }}</div>
  <SleeveForm @save="handleSave" />
</template>
