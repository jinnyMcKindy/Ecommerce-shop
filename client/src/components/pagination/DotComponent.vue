<template>
  <div class="c2c-dot" 
  v-on:click="$emit('click-dots', value)" 
  v-html="icon"
  v-if="Max">
  <div class="dot-inner"></div>
</div>
</template>
<script>
  export default {
    name : 'dot-component',
    props : ["Max", "value", "icon"],
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
