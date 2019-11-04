import Vue from 'vue';
import VueRouter from 'vue-router';
import Basket from '@/components/basket/Basket';
import Main from '@/components/Main';
import Politics from '@/components/Politics';
import Checkout from '@/components/basket/Checkout';
import Sent from '@/components/order/Sent';
import Admin from '@/components/admin/Admin';

Vue.use(VueRouter);

const routes = [
  { path: '/Ecommerce-shop/basket', component: Basket, name: 'basket' },
  { path: '/Ecommerce-shop/', name: 'home', component: Main },
  { path: '/Ecommerce-shop/politics', component: Politics, name: 'politics' },
  { path: '/Ecommerce-shop/checkout', component: Checkout, name: 'checkout' },
  { path: '/Ecommerce-shop/sent', component: Sent, name: 'sent' },
  { path: '/Ecommerce-shop/admin', component: Admin, name: 'admin' },
  { path: "*", redirect: { name: 'home' }}
];
const createRouter = function() {
	return new VueRouter({
	  mode: 'history',
	  routes,
	});
}
export default createRouter;

