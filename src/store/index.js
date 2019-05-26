import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios"

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    basket: [],
    totalItems: 0,
    totalPrice: '0.00',
    products: [],
    apiHost: "http://localhost:3000"
  },
  getters: {
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
    setProducts(state, products){
      state.products = products;
    }
  },
  actions: {
    actionProducts({commit, state}) {
      return new Promise((resolve, reject) => {
          if(state.products.length) resolve(state.products);
          const url = `${state.apiHost}/getProducts`;
          axios.get(url).then((response) => {
            const products = response.data; 
            commit('setProducts', products)
            resolve(products)
          }).catch(err => reject(err));
      })
    },
    saveOrder({commit, state}, order){
      return new Promise((resolve, reject) => {
        const url = `${state.apiHost}/saveOrder`;
        axios.post(url, { order }).then((response) => {
          resolve(response)
        }).catch(err => reject(err));
      })
    },
  }
});
