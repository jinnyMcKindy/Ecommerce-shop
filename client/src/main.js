import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueTheMask from 'vue-the-mask';
import App from './App.vue';
import createRouter from '@/routes';
import createStore from '@/store/index'

let router = createRouter();
let store = createStore();

Vue.use(VueTheMask);
Vue.use(VueAxios, axios);

new Vue({
	store,
	router,
  render: h => h(App),
}).$mount('#app');
