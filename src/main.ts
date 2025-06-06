import './styles/reset.css';
import './styles/main.css';
import '@mdi/font/css/materialdesignicons.css';

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
import { createRulesPlugin } from 'vuetify/labs/rules';

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
app.use(createRulesPlugin({}, vuetify.locale));
app.use(router);
app.config.globalProperties.$axios = axiosInstance;
app.provide('axios', axiosInstance);

app.mount('#app');
