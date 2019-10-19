<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <ul class="nav mr-auto">
      <li class="nav-item menu-light__li">
        <router-link
          class="nav-link nav-link--light"
          to="/"
        >
          Главная
        </router-link>
      </li>
    </ul>
    <router-link
      class="nav-link nav-link--light"
      to="/basket"
    >
      В корзине: {{ totalItems }} Сумма:
      <span>{{ totalPrice | currency }}</span>
    </router-link>
  </nav>
</template>
<script>
export default {
  name: 'Menu',
  computed: {
    totalItems() {
      return this.$store.state.totalItems;
    },
    totalPrice() {
      return this.$store.state.totalPrice;
    },
  },
};
</script>
<style lang="less">
	.nav-link--light {
	    color: #999;
	}
</style>
