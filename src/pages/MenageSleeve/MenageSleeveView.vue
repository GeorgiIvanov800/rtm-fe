<script lang="ts" setup>
import { useRoute } from 'vue-router';
import SleeveForm from './components/SleeveForm.vue';
import { useSleeveApi } from '@/services/sleeveService';
import { reactive } from 'vue';
import type { SaveSleeveRequest } from '@/openapi';
import { computed } from 'vue';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();

const { sleeves, isLoading, error, fetchAll, createSleeve } = useSleeveApi();

const formDto = reactive<SaveSleeveRequest>;

const isEdit = computed(() => Boolean(route.params.id));
const original = computed(() => sleeves.value.find(sleeve => sleeve.id === Number(route.params.id)));



</script>


<template>
  <h1>Menage Seeve View Works</h1>
  <SleeveForm />
</template>
