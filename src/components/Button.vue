<template>
    <button role="button" v-on:click.stop.prevent="$emit('buy', figure)">{{text}}</button>
</template>

<script>
export default {
  name: 'Button',
  props: ['figure', 'text'],
};
</script>

<style scoped>
body {
    background: red;
}

</style>
