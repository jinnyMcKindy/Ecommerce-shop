<template>
  <div class="container basket">
    <div>
      <div
        v-if="!figures.length"
        class="empty"
      >
        Пусто
      </div>
      <Products
        :key="key"
        :figures="figures"
        :showBuy="false"
        :visible="visible"
        @buy="removeItem"
        @setResults="setResults"
      />
      <div
        v-if="figures.length"
        class="basket__price"
      >
        Сумма заказа: <span>{{ totalPrice | currency}}</span>
        <router-link
          class="btn btn-info pull-right"
          to="/checkout"
        >
          Оформить заказ
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Products from '@/components/products/Products';
import modal from '@/components/modal';

export default {
  name: 'Basket',
  components: { Products },
  data() {
    return {
      showModal: false,
      key: 0,
      visible: this.figures
    };
  },
  computed: {
    totalPrice() {
      return this.$store.state.totalPrice;
    },
    figures() {
      return this.$store.state.basket;
    }
  },
  mounted(){
    this.visible = this.figures
  },
  methods: {
    setResults(visible) {
      this.visible = visible;
    },
    removeItem({ figure, index }) {
      this.$store.commit('deleteProduct', figure); //make update for products
     // this.visible.splice(index, 1)
    },
    closeModal() {
      this.showModal = false;
      this.figures = [];
      this.$store.commit('deleteAll');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.dum {
    color : black;
}
.pull-right {
    float: right;
}
.basket {
    min-height: calc(100vh - 200px);
}
.basket__price {
    margin-top: 10px;
    padding:10px;
}
.empty {
  text-align: center;
}
</style>
