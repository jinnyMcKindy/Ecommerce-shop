import Vue from 'vue';
import VueRouter from 'vue-router';
import Basket from './components/Basket';
import Main from './components/Main';
import Politics from './components/Politics';

Vue.use(VueRouter);

const routes = [
  { path: '/basket', component: Basket },
  { path: '/', component: Main },
  { path: 'politics', Politics },
];
const router = new VueRouter({
  routes,
});
export default router;
