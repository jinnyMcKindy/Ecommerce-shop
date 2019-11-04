<template>
  <div class="container basket">
    <div>
      <div v-if="!figures.length" class="empty">
        Пусто
      </div>
      <Products
        v-else
        :key="key"
        :figures="figures"
        :per-page="perPage"
        :active-page="activePage"
        :visible="visible"
        type="basket"
        @buy="removeItem"
        @setResults="setResults"
      />
      <div v-if="figures.length" class="basket__price">
        Сумма заказа: <span>{{ totalPrice | currency }}</span>
        <router-link class="btn btn-info pull-right" to="/checkout">
          Оформить заказ
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Products from "@/components/products/Products";
export default {
  name: "Basket",
  components: { Products },
  data() {
    return {
      showModal: false,
      key: 0,
      activePage: 1,
      visible: this.figures,
      perPage: 3
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
  mounted() {
    this.visible = this.figures.slice(0, this.perPage);
    console.log(this.visible, this.figures, this.perPage);
  },
  methods: {
    setResults(visible) {
      this.visible = visible;
      // this.key++;
    },
    removeItem({ figure, currentPage }) {
      this.$store.commit("deleteProduct", figure); //make update for products
      this.activePage = currentPage;
      this.key++; //to Update number of selected products
      console.log(figure, this.visible, this.activePage);
      this.$nextTick(() => {
        if (this.activePage === 1 && !figure.count) {
          this.visible = this.visible.filter(v => v._id !== figure._id);
          return;
        }
        if (figure.count === 0 && this.visible.length === 0) {
          this.activePage--;
          this.key++;
          return;
        }
      });
    },
    closeModal() {
      this.showModal = false;
      this.figures = [];
      this.$store.commit("deleteAll");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.dum {
  color: black;
}
.pull-right {
  float: right;
}
.basket {
  min-height: calc(100vh - 200px);
}
.basket__price {
  margin-top: 10px;
  padding: 10px;
}
.empty {
  text-align: center;
}
</style>
