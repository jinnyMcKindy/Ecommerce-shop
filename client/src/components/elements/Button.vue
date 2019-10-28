<template>
  <button
    role="button"
    @click.stop.prevent="$emit('buy')"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: ['text'],
};
</script>

<style scoped>
body {
    background: red;
}

</style>
