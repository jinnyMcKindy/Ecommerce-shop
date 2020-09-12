<template>
  <div class="product-wrapper">
    <Results
      v-for="(figure, index) in visible"
      :key="index"
      :figure="figure"
      :type="type"
      @buy="figure => $emit('buy', { figure, index, currentPage })"
    />
    <!--Issue with basket in pagination-->
    <Pagination
      :type="type"
      v-if="pagination"
      :prop-results="figures"
      :active-page="activePage"
      :max-amount-of-pages="maxAmountOfPages"
      :per-page="perPage"
      @setPage="page => (currentPage = page)"
      @setResults="visible => $emit('setResults', visible)"
    >
      <div slot="orders" />
    </Pagination>
  </div>
</template>
<script>
import Pagination from "@/components/pagination/Pagination";
import Results from "@/components/pagination/Results";

export default {
  name: "Products",
  components: {
    Results,
    Pagination
  },
  props: {
    figures: {
      type: Array,
      default: function() {
        return [];
      }
    },
    visible: {
      type: Array,
      default: function() {
        return [];
      }
    },
    pagination: {
      type: Boolean, default: true, required: false
    },
    type: { type: String, default: "basket", required: false },
    activePage: { type: Number, default: 1 },
    perPage: { type: Number, default: 5 }
  },
  data() {
    return {
      activeNames: [],
      maxAmountOfPages: 10,
      currentPage: this.activePage
    };
  }
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
.active {
  cursor: pointer;
}

</style>
