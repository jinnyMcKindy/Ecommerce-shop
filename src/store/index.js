import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const md5 = require('md5');

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    basket: [],
    totalItems: 0,
    totalPrice: '0.00',
    products: [],
    apiHost: 'http://localhost:8999',
    orders: [],
  },
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
    },
  },
  mutations: {
    addProduct(state, figure) {
      state.basket.push(figure);
      state.totalItems++;
      state.totalPrice = (Number.parseFloat(state.totalPrice) + Number.parseFloat(figure.price)).toFixed(2);
    },
    deleteProduct(state, figure) {
      const { name } = figure;
      state.basket.forEach((item, index) => {
        if (item.name == name) {
          state.basket.splice(index, 1);
          state.totalPrice = (Number.parseFloat(state.totalPrice) - item.price).toFixed(2);
        }
      });
      state.totalItems--;
    },
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
    deleteOrder({ comit, state }, id) {
      return new Promise((resolve, reject) => {
        const url = `${state.apiHost}/deleteOrder`;
        axios.post(url, { id }).then((response) => {
          resolve(response);
        }).catch(err => reject(err));
      });
    },
    actionProducts({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.products.length) resolve(state.products);
        const url = `${state.apiHost}/getProducts`;
        axios.get(url).then((response) => {
          const products = response.data;
          commit('setProducts', products);
          resolve(products);
        }).catch(err => reject(err));
      });
    },
    saveOrder({ commit, state }, order) {
      return new Promise((resolve, reject) => {
        const url = `${state.apiHost}/saveOrder`;
        axios.post(url, { order }).then((response) => {
          resolve(response);
        }).catch(err => reject(err));
      });
    },
    authorise({ commit, state }, user) {
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
