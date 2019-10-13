<template>
  <div
    class="list-group-item"
    @click="expand(figure.name)"
  >
    <div class="product__content">
      {{ figure.name }}
    </div>
    <div class="buttons">
      <div
        v-currency="figure.price"
        class="product__price"
      />
      <slot name="buttons">
        <Button
          v-if="!showBuy(figure.name)"
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
