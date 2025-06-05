import HomeView from '@/pages/HomeView.vue';
import SleeveView from '../pages/Sleeve/SleeveView.vue';
import ManageSleeveView from '../pages/MenageSleeve/MenageSleeveView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/sleeves', name: 'sleeves', component: SleeveView },
  { path: '/manage/sleeves/:id?', name: 'MenageSleeve', component: ManageSleeveView },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
