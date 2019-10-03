import Vue from 'vue';
import VueRouter from 'vue-router';
import Basket from './components/basket/Basket';
import Main from './components/Main';
import Politics from './components/Politics';
import Checkout from './components/basket/Checkout';
import Sent from './components/order/Sent';
import Admin from './components/admin/Admin';

Vue.use(VueRouter);

const routes = [
  { path: '/basket', component: Basket, name: "basket" },
  { path: '/', name: "home", component: Main },
  { path: '/politics', component: Politics, name: "politics" },
  { path: '/checkout', component: Checkout, name: "checkout"},
  { path: '/sent', component: Sent, name: "sent"},
  { path: '/admin', component: Admin, name: "admin" }
];
const router = new VueRouter({
  mode: 'history',
  routes,
});
export default router;
