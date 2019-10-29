import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import json from '@/store/products.json'

const md5 = require('md5');

Vue.use(Vuex);
function floatOperation(num, num2, operator){
  return eval(`(Number.parseFloat(${num}) ${operator} Number.parseFloat(${num2})).toFixed(2)`)
}

function createStore () {
  return  new Vuex.Store({
    state: () => ({
        basket: [],
        totalItems: 0,
        totalPrice: '0.00',
        products: [],
        apiHost: 'http://localhost:3000',
        orders: []
    }),
  getters: {
    getHost(state) {
      return state.apiHost;
    },
    getOrders(state) {
      return state.orders;
    },
    getProducts(state) {
      return state.products;
    },
    getBasket(state) {
      return state.basket;
    },
    getTotalPrice(state) {
      return state.totalPrice;
    }
  },
  mutations: {
    deleteAll(state) {
      state.basket = [];
      state.totalItems = 0;
      state.totalPrice = '0.00';
    },
    setProducts(state, products) {
      state.products = products;
    },
    setOrders(state, orders) {
      state.orders = orders;
    },
    addProduct(state, figure) {
      /* need to increase numbers of ordered item in case it exists in basket */
      let productExists = state.basket.find((val) => val._id === figure._id)
      if(productExists) productExists.count++;
      else { 
        figure.count = 1;
        state.basket.push(figure); 
      }
      state.totalItems++;
      state.totalPrice = floatOperation(state.totalPrice, figure.price, '+')
    },
    deleteProduct(state, figure) {
      let ind = 0;
      let productExists = state.basket.find((val, index) => {
        ind = index;
        return val._id === figure._id;
      })
      if(productExists) {
        state.totalItems--;
        state.totalPrice = floatOperation(state.totalPrice, productExists.price, '-')
        if(productExists.count <= 1) state.basket.splice(ind, 1); /* remove item if there's onle 1 in the basket*/
        productExists.count--
      }
    },
  },
  actions: {
    actionOrders({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.orders.length) resolve(state.orders);
        const url = `${state.apiHost}/getOrders`;
        axios.get(url).then((response) => {
          const orders = response.data;
          commit('setOrders', orders);
          resolve(orders);
        }).catch(err => reject(err));
      });
    },
    deleteOrder({ state }, id) {
      return new Promise((resolve, reject) => {
        const url = `${state.apiHost}/deleteOrder`;
        axios.post(url, { id }).then((response) => {
          resolve(response);
        }).catch(err => reject(err));
      });
    },
    actionProducts({ commit, state }) {
        if (state.products.length) return;
        const url = `${state.apiHost}/getProducts`;
        return axios.get(url).then((response) => {
          const products = response.data;
          commit('setProducts', products);
        }).catch(err => {
          console.log("Couldn't get products")
          commit('setProducts', json);
        });
    },
    saveOrder({ state }, order) {
      return new Promise((resolve, reject) => {
        const url = `${state.apiHost}/saveOrder`;
        axios.post(url, { order }).then((response) => {
          resolve(response);
        }).catch(err => reject(err));
      });
    },
    authorise({ state }, user) {
      return new Promise((resolve, reject) => {
        const url = `${state.apiHost}/getUsers`;
        axios.get(url).then((response) => {
          const savedUser = response.data;
          let logged = false;
          savedUser.forEach((value) => {
            if (value.login == user.login && value.password == md5(user.password)) {
              logged = true;
            } else {
              logged = false;
            }
          });
          if(logged) resolve() 
          else reject()
        }).catch(err => reject(err));
      });
    },
  },
});
}
export default createStore;