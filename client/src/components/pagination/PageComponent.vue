<template>
  <div
    class="page"
    @click="$emit('navigate-of')"
  >
    {{ page }}
  </div>
</template>
<script>
export default {
  name: 'PageComponent',
  props: ['page', 'maxAmount'],
};
</script>
