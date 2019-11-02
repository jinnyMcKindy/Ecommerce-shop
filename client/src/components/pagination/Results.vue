<template>
  <div
    class="list-group-item"
    @click="expand(figure.name)"
    >
    <div class="product__content">
      {{ figure.name }}
    </div>
    <div class="buttons">
      <div class="product__price"> 
        {{ figure.price | currency }}
        <span class="selected" v-if="figure.count">В корзине: {{ figure.count }}</span> 
      </div>
      <slot name="buttons">
        <Button
          v-if="showBuy"
          :text="'Купить'"
          class="btn btn-info pull-right"
          @buy="buy(figure)"
        />
        <Button
          v-else
          :text="'Удалить'"
          class="btn btn-danger pull-right products-btn__delete"
          :figure="figure"
          @buy="buy(figure)"
        />
      </slot>
    </div>
  </div>
</template>
<style scoped lang="less">
  .selected {
    padding: 5px;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: 5px;
  }
</style>
<script>
import Button from '@/components/elements/Button';

export default {
  name: 'Results',
  components: {
    Button,
  },
  data: function(){
    return {

    }
  },
  props: ['figure', 'showBuy'],
  serverPrefetch () {
    return this.preFetch()
  },
  methods: {
    /* for server-side */
    buy(figure){
      this.$emit('buy', figure)
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
