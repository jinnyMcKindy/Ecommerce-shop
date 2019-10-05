<template>
  <div class="container">
    <Products
      :key="key"
      :figures="figures"
      :basket="basket"
      @buy="buy"
    />
  </div>
</template>
<script>
import Products from './products/Products';

export default {
  name: 'Main',
  components: { Products },
  data() {
    return {
      basket: [],
      figures: [],
      key: 0,
    };
  },
  created() {
    this.$store.dispatch('actionProducts').then((data) => {
      this.figures = data;
      this.key++;
    },
    error => console.log(error));
  },
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
