<template>
  <div
    class="list-group-item"
    @click="expand(figure.name)"
  >
    <div class="product__content">
      {{ figure.name }}
    </div>
    <div class="buttons">
      <div class="product__price">{{ figure.price | currency }}</div>
      <slot name="buttons">
        <Button
          v-if="!showBuy(figure._id)"
          :text="'Купить'"
          class="btn btn-info pull-right"
          :figure="figure"
          @buy="$emit('buy', figure)"
        />
        <Button
          v-else
          :text="'Удалить'"
          class="btn btn-danger pull-right products-btn__delete"
          :figure="figure"
          @buy="$emit('buy', figure)"
        />
      </slot>
    </div>
  </div>
</template>
<script>
import Button from '@/components/elements/Button';

export default {
  name: 'Results',
  components: {
    Button,
  },
  props: ['figure'],
  serverPrefetch () {
    return this.preFetch()
  },
  methods: {
    /* for server-side */
    preFetch(){
      return this.$store.dispatch('actionProducts')
    },
    showBuy(id) {
      const { basket } = this.$store.state;
      const exists = basket.filter(item => item._id == id);
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
