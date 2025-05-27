import HomeView from '@/pages/HomeView.vue';
import SleeveView from '../pages/Sleeve/SleeveView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/sleeves', name: 'sleeves', component: SleeveView },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
