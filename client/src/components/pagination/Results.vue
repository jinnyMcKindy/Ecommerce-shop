<template>
  <div class="list-group-item" @click="expand(figure.name)">
    <div class="product__content">
      {{ figure.name }}
    </div>
    <div class="buttons">
      <div class="product__price">
        {{ figure.price | currency }}
        <span v-if="figure.count" class="selected"
          >В корзине: {{ figure.count }}</span
        >
      </div>
      <slot name="buttons">
        <Button
          v-if="type === 'products'"
          :text="'Купить'"
          class="btn btn-info pull-right"
          @buy="buy(figure)"
        />
        <Button
          v-else
          :text="'Удалить'"
          :figure="figure"
          class="btn btn-danger pull-right products-btn__delete"
          @buy="buy(figure)"
        />
      </slot>
    </div>
  </div>
</template>
<style scoped lang="less">
.selected {
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 5px;
}
</style>
<script>
import Button from "@/components/elements/Button";

export default {
  name: "Results",
  components: {
    Button
  },
  props: {
    figure: {
      type: Object,
      default: function() {
        return {};
      }
    },
    type: { type: String, default: "basket" }
  },
  data: function() {
    return {};
  },
  serverPrefetch() {
    return this.preFetch();
  },
  methods: {
    /* for server-side */
    buy(figure) {
      this.$emit("buy", figure);
    }
    /* expand(name) {
        if( this.activeNames.includes(name) ) {
            let index = this.activeNames.indexOf(name);
            this.activeNames.splice(index, 1); } else {
            this.activeNames.push(name);
        }
    } */
  }
};
</script>
