<template>
     <div 
        v-on:click="expand(figure.name)" 
        class="list-group-item">
           <div class="product__content">
              {{figure.name}}
            </div>
           <div class="buttons">
              <div class="product__price" v-currency="figure.price"></div>
              <slot name="buttons">
               <Button 
                 v-if="!showBuy(figure.name)" 
                 v-bind:text="'Купить'"
                 class="btn btn-info pull-right" 
                 :figure="figure" 
                 v-on:buy="$emit('buy', figure)">
               </Button>
               <Button 
                 v-else 
                 v-bind:text="'Удалить'" 
                 class="btn btn-danger pull-right products-btn__delete" 
                 :figure="figure" 
                 v-on:buy="$emit('buy', figure)">
               </Button>
             </slot>
           </div>
    </div>
</template>
<script>
import Button from '../Button';
export default { 
  name : 'results',
  components: {
    Button
  },
  props : ["figure"],
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
