<script lang="ts" setup>
import { useRoute } from 'vue-router';
import SleeveForm from './components/SleeveForm.vue';
import { useSleeveApi } from '@/services/sleeveService';
import type { SaveSleeveRequest } from '@/openapi';
import { computed } from 'vue';
import { onMounted } from 'vue';

const route = useRoute();
// const router = useRouter();

const { sleeves, isLoading, error, fetchAll, createSleeve } = useSleeveApi();

const isEdit = computed(() => Boolean(route.params.id));
// const original = computed(() => sleeves.value.find(sleeve => sleeve.id === Number(route.params.id)));

function handleSave(payload: SaveSleeveRequest): void {
  createSleeve(payload);
}


</script>


<template>
  <h1>{{ isEdit ? 'Edit Sleeve' : 'Neu Sleeve' }}</h1>
  <div v-if="error" class="text-red-500">{{ error }}</div>
  <SleeveForm @save="handleSave" />
</template>
