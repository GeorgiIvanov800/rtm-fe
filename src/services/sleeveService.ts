import { SleeveControllerApi, type SaveSleeveRequest, type SleeveResponse } from '@/openapi';

const api = new SleeveControllerApi();

export async function getAllSleevesBySequenceNumber(seq: number): Promise<SleeveResponse[]> {
  const response = await api.getSleeveSequenceNumber(seq);
  return response.data;
}

export async function saveSleeve(dto: SaveSleeveRequest): Promise<SleeveResponse> {
  const response = await api.saveSleeve(dto);
  return response.data;
}

export async function getSleeveBySleeveNumber(sleeveNumber: number): Promise<SleeveResponse> {
  const response = await api.getSleeveNumber(sleeveNumber);
  return response.data;
}

export async function updateSleeve(
  id: number,
  dto: Partial<SaveSleeveRequest>,
): Promise<SleeveResponse> {
  const response = await api.updateSleeve(id, dto);
  return response.data;
}

export async function deleteSleeve(id: number): Promise<void> {
  await api.deleteSleeve(id);
}
