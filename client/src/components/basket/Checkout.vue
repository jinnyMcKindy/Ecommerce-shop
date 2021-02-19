<template>
  <Details v-if="basket.length" class="details checkout" @close="toHome">
    <div slot="figures" class="details__figures">
      <Products
        :key="key"
        :figures="basket"
        :per-page="10"
        :active-page="activePage"
        :visible="visible"
        :pagination="false"
        type="checkout"
        @setResults="setResults"
      >
        <div scope="buttons" />
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
import { mapState } from "vuex";

export default {
  name: "Checkout",
  components: {
    Details,
    Products
  },
  data() {
    return {
      price: 0,
      key: 0,
      activePage: 1
    };
  },
  computed: {
    ...mapState(["basket", "totalPrice"]),
    visible: function() {
      return this.basket;
    }
  },
  mounted() {
    this.price = this.$store.getters.getTotalPrice;
    if (!this.basket.length) this.$router.push({ name: "home" });
  },
  methods: {
    toHome() {
      this.$store.commit("deleteAll");
      this.$router.push({ name: "sent" });
    },
    setResults(visible) {
      this.visible = visible;
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
