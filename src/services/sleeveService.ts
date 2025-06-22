import { SleeveControllerApi, type SaveSleeveRequest, type SleeveResponse } from '@/openapi';

const api = new SleeveControllerApi();

export function getAllSleevesBySequenceNumber(seq: number): Promise<SleeveResponse[]> {
  return api.getSleeveSequenceNumber(seq).then((response) => response.data);
}

export function saveSleeve(dto: SaveSleeveRequest): Promise<SleeveResponse> {
  return api.saveSleeve(dto).then((response) => response.data);
}

export function getSleeveBySleeveNumber(sleeveNumber: number): Promise<SleeveResponse> {
  return api.getSleeveNumber(sleeveNumber).then((response) => response.data);
}

// export function updateSleeve(dto: SaveSleeveRequest): Promise<SleeveResponse> {
//   return api.updateSleeve(dto., requestBody).then((response) =>response.data);
// }
