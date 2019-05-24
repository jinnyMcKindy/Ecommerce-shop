<template>
   <div class="product-wrapper">
       <div v-for="(figure, index) in figures" class="list-group product">
           <div v-on:click="expand(figure.name)" class="list-group-item">
               {{figure.name}}
               <div class="buttons">
                   <Button v-if="!showBuy(figure.name)" v-bind:text="'Купить'"
                   class="btn btn-info" :figure="figure" v-on:buy="$emit('buy', figure)">
                   </Button>
                   <Button v-else v-bind:text="'Удалить'" class="btn btn-danger" :figure="figure" v-on:buy="$emit('buy', figure)">
                   </Button>
               </div>
           </div>
           <!--<li class="list-group-item " v-if="activeNames.includes(figure.name)" v-for="(detail, key) in figure">
               {{key}} : {{detail}}
           </li>-->
       </div>
   </div>
</template>

<script>
import Button from './Button';

export default {
  name: 'Products',
  props: ['figures', 'basket'],
  components: { Button },
  data() {
    return {
      activeNames: [],
    };
  },
  methods: {
    showBuy(name) {
      const { basket } = this.$store.state;
      const exists = basket.filter(item => item.name == name);
      return exists.length;
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

<style scoped>
  .buttons {
      float: right;
  }
  li {
      margin: 5px;
      cursor: pointer;
  }
  .active  {
      cursor: pointer;
  }

</style>
