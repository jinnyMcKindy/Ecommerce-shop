<template>
    <div class="container basket">
        <div>
           <div class="empty" v-if="!figures.length">Пусто</div>
            <Products :figures="figures"
                v-on:buy="removeItem" >
            </Products>
            <div class="basket__price" v-if="figures.length">
                Сумма заказа: <span v-currency="totalPrice"></span>
              <router-link 
                class="btn btn-info pull-right" 
                to="/checkout">
              Оформить заказ
            </router-link>
            </div>
        </div>

    </div>
</template>
<script>
import Products from './Products';
import modal from './modal';
import Details from './Details';

export default {
  name: 'Basket',
  data() {
    return {
      figures: [],
      showModal: false,
    };
  },
  created() {
    this.figures = this.$store.state.basket;
  },
  components: { Products, Details },
  computed: {
    totalPrice() {
      return this.$store.state.totalPrice;
    },
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
