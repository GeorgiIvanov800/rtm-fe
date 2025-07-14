import { Configuration, SleeveControllerApi, type SaveSleeveRequest, type SleeveResponse } from '@/openapi';
import { useKeycloak, type VueKeycloakInstance } from '@dsb-norge/vue-keycloak-js';

const keycloak: VueKeycloakInstance = useKeycloak();

const configuration = new Configuration({
  accessToken: () => {
    const token: string = keycloak.token!;
    return token ? `${token}` : '';
  }
})
const api = new SleeveControllerApi(configuration);

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
