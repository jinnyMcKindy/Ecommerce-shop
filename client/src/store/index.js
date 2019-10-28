import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import json from '@/store/products.json'

const md5 = require('md5');

Vue.use(Vuex);

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
      /* need to add numbers of ordered item in case it exists in basket */
      state.basket.push(figure);
      state.totalItems++;
      state.totalPrice = (Number.parseFloat(state.totalPrice) + Number.parseFloat(figure.price)).toFixed(2);
    },
    deleteProduct(state, figure) {
      const { name } = figure;
      state.basket.forEach((item, index) => {
        if (item.name == name) {
          figure.inBasket = true;
          state.basket.splice(index, 1);
          state.totalPrice = (Number.parseFloat(state.totalPrice) - item.price).toFixed(2);
        }
      });
      state.totalItems--;
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
    deleteOrder({ commit, state }, id) {
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
          savedUser.forEach((value) => {
            if (value.login == user.login && value.password == md5(user.password)) {
              resolve();
            } else {
              reject();
            }
          });
        }).catch(err => reject(err));
      });
    },
  },
});
}
export default createStore;