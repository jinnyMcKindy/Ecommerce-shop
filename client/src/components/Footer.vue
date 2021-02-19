<template>
  <footer :class="{ absoluteClass }" class="footer footer-border menu-light">
    <div class="container footer-wrapper">
      <router-link class="nav-link nav-link--light" :to="{ name: 'politics' }">
        Политика
      </router-link>
      <router-link class="nav-link nav-link--light" :to="{ name: 'politics' }">
        Доставка
      </router-link>
      <router-link class="nav-link nav-link--light" :to="{ name: 'politics' }">
        Возврат
      </router-link>
      <router-link class="nav-link nav-link--light" :to="{ name: 'politics' }">
        Контакты
      </router-link>
    </div>
    <small>
      Персональные данные посетителей сайта обрабатываются в соответствии
      <router-link :to="{ name: 'politics' }"
        >с официальной политикой.</router-link
      >
      Сайт *** носит информационный характер и не является публичной офертой,
      определяемой положениями Статьи 437 ГК РФ.
    </small>
  </footer>
</template>
<script>
/**
 * write a component's description
 */

import { mapState } from "vuex";
export default {
  name: "Footer",
  /**
   * @description Defines if show or hide footer
   * @returns footerClass {boolean}
   */
  data: function() {
    return {
      footerClass: false
    };
  },
  computed: mapState({
    absoluteClass: state => state.footer
  })
};
</script>
<style type="less">
.footer {
  padding-bottom: 20px;
  position: statick;
  bottom: 0;
  width: 100%;
  text-align: center;
}
.absoluteClass {
  bottom: 0;
  position: absolute;
}
.footer-border {
  border-top: 1px solid #e9e9e9;
}
.custom-list-group .list-group-item {
  background: none;
  border: none;
  padding: 0.5em 0.25em;
}
.footer-wrapper {
  display: flex;
  justify-content: center;
}
</style>
