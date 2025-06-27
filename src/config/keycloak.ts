import type { VueKeycloakOptions } from '@dsb-norge/vue-keycloak-js';

export const keycloakOptions: VueKeycloakOptions = {
  init: {
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  },
  config: {
    url: 'http://localhost:8080',
    realm: 'rtm',
    clientId: 'vue-app',
  },
};
