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
        :figures="figures"
        @buy="removeItem"
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
      figures: [],
      showModal: false,
    };
  },
  computed: {
    totalPrice() {
      return this.$store.state.totalPrice;
    },
  },
  created() {
    this.figures = this.$store.state.basket;
  },
  methods: {
    clicked() {
      console.log('clicked');
    },
    removeItem(figure) {
      this.$store.commit('deleteProduct', figure);
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
