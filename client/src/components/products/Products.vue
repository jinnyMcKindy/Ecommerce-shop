<template>
   <div class="product-wrapper">
      <results v-for="(figure, index) in visible" 
        v-bind:key="index"
        :figure="figure"
        @buy="(figure) => $emit('buy', figure)"> 
      </results>
       <Pagination
          :rightIcon="rightIcon"
          :leftIcon="leftIcon"
          v-bind:key="pkey"
          :results="figures"
          :maxAmountOfPages="maxAmountOfPages"
          :perPage="perPage"
          @setResults="setResults">
          <div slot="orders"></div>
        </Pagination>
   </div>
</template>

<script>
import Button from '@/elements/Button';
import Pagination from '@/pagination/Pagination';
import Results from '@/pagination/Results';
export default {
  name: 'Products',
  props: ['basket', 'figures'],
  components: { 
    Button,
    Results,
    Pagination
  },
  mounted: function(){ 
    this.pkey = this.pkey + Math.random(0, 10);
  },
  data() {
    return {
      activeNames: [],
      visible: this.figures,
      leftIcon : '<i class="fa fa-arrow-left"></i>',
      rightIcon: '<i class="fa fa-arrow-right"></i>',
      pkey: "p",
      maxAmountOfPages : 4,
      perPage : 6,
    };
  },
  methods: {
    showBuy(name) {
      const { basket } = this.$store.state;
      const exists = basket.filter(item => item.name == name);
      return exists.length;
    },
    setResults: function(visible){
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
