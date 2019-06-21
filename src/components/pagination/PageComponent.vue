<template>
  <div v-on:click="$emit('navigate-of')" class="page">{{page}}</div>
</template>
<script>
  export default {
    name : 'page-component',
    props : ["page", "maxAmount"],
  };
</script>
