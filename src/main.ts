import './styles/reset.css';
import './styles/main.css';
import '@mdi/font/css/materialdesignicons.css';
import VueKeyCloak, { type VueKeycloakInstance } from '@dsb-norge/vue-keycloak-js';

import 'vuetify/styles';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import App from './App.vue';
import router from './router';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import axiosInstance from './config/axios';
import { keycloakOptions } from './config/keycloak';

export const IsAdminKey = Symbol('isAdmin');
const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
  theme: {
    defaultTheme: 'light',
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

app.use(createPinia());
app.use(vuetify);

app.config.globalProperties.$axios = axiosInstance;
app.provide('axios', axiosInstance);

app.use(VueKeyCloak, {
  ...keycloakOptions,
  onReady: (keycloak: VueKeycloakInstance) => {
    const isAdmin = keycloak.hasRealmRole!('admin');
    app.provide(IsAdminKey, isAdmin);

    router.beforeEach(async (to, from, next) => {
      if (to.meta.requiresAdmin && !isAdmin) {
        next('/');
        return;
      }
      next();
    });

    app.use(router);

    app.mount('#app');
  },
});
