import Vue from 'vue';
import VueRouter from 'vue-router';
import Basket from './components/Basket';
import Main from './components/Main';
import Politics from './components/Politics';
import Checkout from './components/Checkout';

Vue.use(VueRouter);

const routes = [
  { path: '/basket', component: Basket, name: "basket" },
  { path: '/', name: "home", component: Main },
  { path: '/politics', component: Politics, name: "politics" },
  { path: '/checkout', component: Checkout, name: "checkout"}
];
const router = new VueRouter({
  routes,
});
export default router;
