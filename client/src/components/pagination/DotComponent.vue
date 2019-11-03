<template>
  <div
    v-if="max"
    class="c2c-dot"
    @click="$emit('click-dots', value)"
    v-html="icon"
  >
    <div class="dot-inner" />
  </div>
</template>
<script>
export default {
  name: "DotComponent",
  props: {
    max: { type: Boolean, default: true },
    value: { type: String, default: "right" },
    icon: { type: String, default: '<i class="fa fa-arrow-right"></i>' }
  }
};
</script>
<style>
.c2c-dot {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dot-inner {
  transform: translateY(50%);
}
</style>
