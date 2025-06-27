import type { VueKeycloakOptions } from '@dsb-norge/vue-keycloak-js';

export const keycloakOptions: VueKeycloakOptions = {
  init: {
    onLoad: 'login-required',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  },
  config: {
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  },
};
