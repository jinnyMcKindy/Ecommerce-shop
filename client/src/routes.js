import Vue from 'vue';
import VueRouter from 'vue-router';
import Basket from '@/components/basket/Basket';
import Main from '@/components/Main';
import Politics from '@/components/Politics';
import Checkout from '@/components/basket/Checkout';
import Sent from '@/components/order/Sent';
import Admin from '@/components/admin/Admin';

Vue.use(VueRouter);
const prefix = '/Ecommerce-shop'
const routes = [
  { path: `${prefix}/basket`, component: Basket, name: 'basket' },
  { path: `${prefix}/`, name: 'home', component: Main },
  { path: `${prefix}/politics`, component: Politics, name: 'politics' },
  { path: `${prefix}/checkout`, component: Checkout, name: 'checkout' },
  { path: `${prefix}/sent`, component: Sent, name: 'sent' },
  { path: `${prefix}/admin`, component: Admin, name: 'admin' },
  { path: "*", redirect: { name: 'home' }}
];
const createRouter = function() {
	return new VueRouter({
	  mode: 'history',
	  routes,
	});
}
export default createRouter;

