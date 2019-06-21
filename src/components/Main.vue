<template>
    <div class="container">
        <Products 
            :figures="figures"
            v-on:buy="buy"
            v-bind:key="key"
            :basket="basket">
        </Products>
    </div>
</template>
<script>
import Products from './Products';
export default {
  name: 'Main',
  data() {
    return {
      basket: [],
      figures: [],
      key: 0
    };
  },
  created: function(){
      this.$store.dispatch("actionProducts").then(data => {
        this.figures = data;
        this.key++
      }, 
      error => console.log(error));
  },
  components: { Products },
  methods: {
    addProduct(figure) {
      const { name } = figure;
      this.basket.push(name);
      this.$store.commit('addProduct', figure);
    },
    deleteProduct(figure) {
      const { name } = figure;
      const index = this.basket.indexOf(name);
      this.basket.splice(index, 1);
      this.$store.commit('deleteProduct', figure);
    },
    buy(figure) {
      const { name } = figure;
      const { basket } = this.$store.state;
      const exists = basket.filter(item => item.name == name);
      if (exists.length) {
        this.deleteProduct(figure);
      } else {
        this.addProduct(figure);
      }
    },
  },
};
</script>
<style lang="less">
  @import "main.less";
</style>
