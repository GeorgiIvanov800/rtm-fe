import { SleeveControllerApi, type SaveSleeveRequest, type SleeveResponse } from '@/openapi';

const api = new SleeveControllerApi();

export function getAllSleevesBySequenceNumber(seq: number): Promise<SleeveResponse[]> {
  console.log('Fetch called');
  return api.getSleeveSequenceNumber(seq).then((response) => response.data);
}

export function saveSleeve(dto: SaveSleeveRequest): Promise<SleeveResponse> {
  return api.saveSleeve(dto).then((response) => response.data);
}
