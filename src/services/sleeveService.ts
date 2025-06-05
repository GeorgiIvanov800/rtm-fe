import { SleeveControllerApi, type SaveSleeveRequest, type SleeveResponse } from '@/openapi';
import { ref } from 'vue';

export function useSleeveApi() {
  const sleeves = ref<SleeveResponse[]>([]);
  const error = ref<string | null>(null);
  const isLoading = ref(false);
  const api = new SleeveControllerApi();

  async function fetchAll(sequenceNumber: number) {
    error.value = null;

    try {
      const resp = await api.getSleeveSequenceNumber(sequenceNumber);
      sleeves.value = resp.data;
    } catch (err: any) {
      error.value = err.message || 'Unknown error.';
    } finally {
      isLoading.value = false;
    }
  }

  async function createSleeve(dto: SaveSleeveRequest) {
    isLoading.value = true;
    error.value = null;

    try {
      const { data } = await api.saveSleeve(dto);
      sleeves.value.push(data);
    } catch (err: any) {
      error.value = err.message || 'Unknow Error for Create Sleeve';
    } finally {
      isLoading.value = false;
    }
  }

  return { sleeves, isLoading, error, fetchAll, createSleeve };
}
