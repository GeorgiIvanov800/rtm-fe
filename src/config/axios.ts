import { useKeycloak, type VueKeycloakInstance } from '@dsb-norge/vue-keycloak-js';
import axios from 'axios'

const keycloak:VueKeycloakInstance = useKeycloak();

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8088',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if(keycloak.authenticated) {
      const token:string = keycloak.token!;

      if(token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance
