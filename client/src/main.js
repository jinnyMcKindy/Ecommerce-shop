import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueTheMask from 'vue-the-mask';
import App from './App.vue';

Vue.use(VueTheMask);
Vue.use(VueAxios, axios);

new Vue({
  render: h => h(App),
}).$mount('#app');
