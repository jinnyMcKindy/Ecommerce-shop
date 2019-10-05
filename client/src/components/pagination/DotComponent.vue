<template>
  <div
    v-if="Max"
    class="c2c-dot"
    @click="$emit('click-dots', value)"
    v-html="icon"
  >
    <div class="dot-inner" />
  </div>
</template>
<script>
export default {
  name: 'DotComponent',
  props: ['max', 'value', 'icon'],
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
  };
</style>
