<template>
  <div class="container">
    <Products
      :key="key"
      :showBuy="true"
      :figures="figures"
      :activePage="activePage"
      :visible="visible"
      @setResults="setResults"
      @buy="buy"
    />
  </div>
</template>
<script>
import Products from './products/Products';
import Vue from 'vue';
export default {
  name: 'Main',
  components: { Products },
  data() {
    return {
      key: 0,
      visible: this.figures,
      activePage: 1
    };
  },
  computed: {
    figures () {
      return this.$store.state.products;
    }
  },
  serverPrefetch () {
    return this.$store.dispatch('actionProducts');
  },
  mounted() {
    if(!this.figures.length){
      this.$store.dispatch('actionProducts');
    }
  }, 
  methods: {
    addProduct(figure) {
      const { name } = figure;
      this.$store.commit('addProduct', figure);
    },
    setResults(visible) {
      this.visible = visible;
    },
    deleteProduct(figure) {
      this.$store.commit('deleteProduct', figure);
    },
    buy({ figure, index, currentPage }) {
      const { name } = figure;
      const { basket } = this.$store.state;
      const exists = basket.filter(item => item.name == name);
      this.addProduct(figure);
      this.key++; //to Update number of selected products
      this.activePage = currentPage;
      /*
       if (exists.length) {
        this.deleteProduct(figure);
      } else {
        //this.addProduct(figure); 
      }
      */
    },
  },
};
</script>
<style lang="less">
  @import "main.less";
</style>
