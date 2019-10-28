<template>
  <div class="product-wrapper">
    <results
      v-for="(figure, index) in visible"
      :key="index"
      :figure="figure"
      :showBuy='showBuy'
      @buy="(figure) => $emit('buy', {figure, index})"
    />
    <Pagination
      :key="pkey"
      :right-icon="rightIcon"
      :propResults="figures"
      :left-icon="leftIcon"
      :max-amount-of-pages="maxAmountOfPages"
      :per-page="perPage"
      @setResults="(visible) => $emit('setResults', visible)"
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
  props: ['figures', 'visible', 'showBuy'],
  data() {
    return {
      activeNames: [],
      leftIcon: '<i class="fa fa-arrow-left"></i>',
      rightIcon: '<i class="fa fa-arrow-right"></i>',
      pkey: 'p',
      maxAmountOfPages: 4,
      perPage: 6
    };
  },
  mounted() {
    this.pkey = this.pkey + Math.random(0, 10);
  },
  methods: {
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
