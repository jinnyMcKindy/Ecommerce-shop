<template>
  <div class="product-wrapper">
    <results
      v-for="(figure, index) in visible"
      :key="index"
      :figure="figure"
      @buy="(figure) => $emit('buy', figure)"
    />
    <Pagination
      :key="pkey"
      :right-icon="rightIcon"
      :left-icon="leftIcon"
      :results="figures"
      :max-amount-of-pages="maxAmountOfPages"
      :per-page="perPage"
      @setResults="setResults"
    >
      <div slot="orders" />
    </Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/pagination/Pagination';
import Results from '@/components/pagination/Results';

export default {
  name: 'Products',
  components: {
    Results,
    Pagination,
  },
  props: ['basket', 'figures'],
  data() {
    return {
      activeNames: [],
      visible: this.figures,
      leftIcon: '<i class="fa fa-arrow-left"></i>',
      rightIcon: '<i class="fa fa-arrow-right"></i>',
      pkey: 'p',
      maxAmountOfPages: 4,
      perPage: 6,
    };
  },
  mounted() {
    this.pkey = this.pkey + Math.random(0, 10);
  },
  methods: {
    showBuy(name) {
      const { basket } = this.$store.state;
      const exists = basket.filter(item => item.name == name);
      return exists.length;
    },
    setResults(visible) {
      this.visible = visible;
    },
    expand(name) {
      /*
        if( this.activeNames.includes(name) ) {
            let index = this.activeNames.indexOf(name);
            this.activeNames.splice(index, 1); } else {
            this.activeNames.push(name);
        }
      */
    },
  },
};
</script>

<style>
  .list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product__price {
    padding: 10px;
    float: left;
  }
  .buttons {
    min-width: 200px;
  }
  .product__content {
    padding-right: 20px;
  }
  li {
      margin: 5px;
      cursor: pointer;
  }
  .active  {
      cursor: pointer;
  }

</style>
