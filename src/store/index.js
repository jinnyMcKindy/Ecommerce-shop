import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        basket: [],
        totalItems: 0,
        totalPrice: "0.00"
    },
    mutations: {
        addProduct (state, figure) {
            state.basket.push(figure);
            state.totalItems++;
            state.totalPrice = (Number.parseFloat(state.totalPrice) + Number.parseFloat(figure.price)).toFixed(2);
        },
        deleteProduct(state, figure){
            var name = figure.name;
             state.basket.forEach((item, index)=>{
                        if(item.name == name) {
                            state.basket.splice(index, 1);
                            state.totalPrice =  (Number.parseFloat(state.totalPrice) - item.price).toFixed(2);
                        }
                    });
              state.totalItems--;
        }
    }
})
