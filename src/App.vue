<template>
  <div id="app container">
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Перейти к Главной</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/basket">
          Перейти к Корзине.
        </router-link>
      </li>
      <li class="nav-link">
        Кол-во товаров: {{totalItems}}. Сумма: {{totalPrice}}
      </li>
    </ul>
    <div class="row">
      <div class="col col-md-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    Vue.use(VueRouter);
    import store from './store';
    import Basket from './components/Basket.vue';
    import Main from './components/Main.vue'
    const routes = [
        { path: '/basket', component: Basket },
        { path: '/', component: Main }
    ]
    const router = new VueRouter({
        routes
    })
export default {
  name: 'app',

    computed : {
        totalItems: function(){
            return this.$store.state.totalItems;
        },
        totalPrice : function() {
            return this.$store.state.totalPrice;
        }
    },
    router,
    store
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
