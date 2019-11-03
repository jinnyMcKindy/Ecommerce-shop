<template>
  <Details v-if="figures.length" class="details checkout" @close="toHome">
    <div slot="figures" class="details__figures">
      <Products :figures="figures">
        <div slot-scope="buttons" />
      </Products>
    </div>
    <div slot="price" class="details__price">
      К оплате: <span>{{ price | currency }}</span>
    </div>
  </Details>
</template>

<script>
import Details from "@/components/order/details/Details";
import Products from "@/components/products/Products";

export default {
  name: "Checkout",
  components: {
    Details,
    Products
  },
  data() {
    return {
      figures: [],
      price: 0
    };
  },
  mounted() {
    this.figures = this.$store.getters.getBasket;
    this.price = this.$store.getters.getTotalPrice;
    if (!this.figures.length) this.$router.push({ name: "home" });
    // console.log(this.$store.getters.getBasket)
  },
  methods: {
    toHome() {
      this.$store.commit("deleteAll");
      this.$router.push({ name: "sent" });
    }
  }
};
</script>

<style lang="less">
.checkout {
  .products-btn__delete {
    display: none;
  }
  .product__price {
    float: unset;
    text-align: right;
  }
}
.details__price {
  margin-bottom: 20px;
  .product__price {
    float: right;
  }
}
.details__figures {
  margin-bottom: 10px;
}
</style>
