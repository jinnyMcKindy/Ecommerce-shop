<template>
  <div class="product-wrapper">
    <results
      v-for="(figure, index) in visible"
      :key="index"
      :figure="figure"
      :type="type"
      @buy="(figure) => $emit('buy', {figure, index, currentPage})"
    />
    <!--Issue with basket in pagination-->
    <Pagination
      :right-icon="rightIcon"
      :type="type"
      :prop-results="figures"
      :active-page="activePage"
      :left-icon="leftIcon"
      :max-amount-of-pages="maxAmountOfPages"
      :per-page="perPage"
      @setPage="(page) => currentPage = page"
      @setResults="(visible) => $emit('setResults', visible)"
    >
      <div slot="orders" />
    </Pagination>
  </div>
</template>
<script>
import Pagination from '@/components/pagination/Pagination';
import Results from '@/components/pagination/Results';

export default {
  name: 'Products',
  components: {
    Results,
    Pagination,
  },
  props: ['figures', 'visible', 'type', 'activePage', 'perPage'],
  data() {
    return {
      activeNames: [],
      leftIcon: '<i class="fa fa-arrow-left"></i>',
      rightIcon: '<i class="fa fa-arrow-right"></i>',
      maxAmountOfPages: 10,
      currentPage: this.activePage
    };
  },
  updated(){
    let footer = window.innerHeight > this.$el.clientHeight;
    this.$store.commit('setFooter', footer)
  },
};
</script>

<style>
  .list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product__price {
    padding: 10px;
    float: left;
  }
  .buttons {
    min-width: 200px;
  }
  .product__content {
    padding-right: 20px;
    max-width: 70%;
  }
  li {
      margin: 5px;
      cursor: pointer;
  }
  .active  {
      cursor: pointer;
  }

</style>
