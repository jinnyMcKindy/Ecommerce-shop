<template>
  <div class="container">
    <Products
      :key="key"
      :figures="products"
      :per-page="10"
      :active-page="activePage"
      :visible="visible"
      type="products"
      @setResults="setResults"
      @buy="buy"
    />
  </div>
</template>
<script>
import Products from "./products/Products";
import { mapState } from "vuex";
export default {
  name: "Main",
  components: { Products },
  data() {
    return {
      key: 0,
      visible: this.products,
      activePage: 1
    };
  },
  computed: mapState(["products"]),
  serverPrefetch() {
    return this.$store.dispatch("actionProducts");
  },
  mounted() {
    if (!this.products.length) {
      this.$store.dispatch("actionProducts");
    }
  },
  methods: {
    addProduct(figure) {
      this.$store.commit("addProduct", figure);
    },
    setResults(visible) {
      this.visible = visible;
    },
    deleteProduct(figure) {
      this.$store.commit("deleteProduct", figure);
    },
    buy({ figure }) {
      this.addProduct(figure);
      this.key++; //to Update number of selected products
    }
  }
};
</script>
<style lang="less">
@import "main.less";
</style>
