import HomeView from '@/pages/HomeView.vue';
import SleeveView from '../pages/Sleeve/SleeveView.vue';
import ManageSleeveView from '../pages/MenageSleeve/MenageSleeveView.vue';
import PrintSleeveInfo from '../pages/Print/PrintSleeveInfo.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/sleeves', name: 'sleeves', component: SleeveView },
  { path: '/sleeves/create', name: 'CreateSleeve', component: ManageSleeveView },
  { path: '/sleeves/edit/:id', name: 'EditSleeve', component: ManageSleeveView },
  { path: '/sleeves/print', name: 'PrintSleeveInfo', component: PrintSleeveInfo },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
