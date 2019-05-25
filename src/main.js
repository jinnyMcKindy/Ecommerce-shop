import Vue from 'vue';
import App from './App.vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
/*
// Apollo
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

Vue.config.productionTip = false;
Vue.use(VueApollo);

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:3000/getProducts',
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
*/
new Vue({
  //apolloProvider,
  render: h => h(App),
}).$mount('#app');
