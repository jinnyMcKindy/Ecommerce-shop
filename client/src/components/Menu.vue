<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <ul class="nav mr-auto">
      <li class="nav-item menu-light__li">
        <router-link class="nav-link nav-link--light" :to="{ name: 'home' }">
          Главная
        </router-link>
      </li>
    </ul>
    <router-link class="nav-link nav-link--light" :to="{ name: 'admin' }">
      Log in
    </router-link>
    <router-link class="nav-link nav-link--light" :to="{ name: 'basket' }">
      В корзине: {{ totalItems }} Сумма:
      <span>{{ totalPrice | currency }}</span>
    </router-link>
  </nav>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: "Menu",
  computed: {
    ...mapState(['totalPrice', 'totalItems']),
  }
};
</script>
<style lang="less">
.nav-link--light {
  color: #999;
}
</style>
