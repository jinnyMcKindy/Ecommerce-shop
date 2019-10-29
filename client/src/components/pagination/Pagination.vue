<template>
  <div>
    <div class="c2c-pagination">
      <dot-component
        :max="leftMax"
        value="left"
        :icon="leftIcon"
        @click-dots="clickDots"
      />
      <page-component
        v-for="(page) in range(first, visiblePages)"
        :key="page.id"
        :ref="`page-${page}`"
        :page="page"
        :class="['page-' + page, active == page ? 'active' : '']"
        @navigate-of="navigate(page)"
      />
      <dot-component
        :max="rightMax"
        value="right"
        :icon="rightIcon"
        @click-dots="clickDots"
      />
    </div>
  </div>
</template>

<script>
import PageComponent from './PageComponent';
import DotComponent from './DotComponent';

export default {
  name: 'Pagination',
  components: {
    PageComponent,
    DotComponent,
  },
  props: ['leftIcon', 'rightIcon', 'propResults', 'maxAmountOfPages', 'perPage', 'activePage'],
  data() {
    return {
      text: '',
      shownotfound: false,
      pages: 0,
      visiblePages: 0,
      rightMax: false,
      leftMax: false,
      first: 1,
      dirty: true,
      oldUrl: '',
      active: this.activePage,
      size: 0
    };
  },
  computed: {
    results: function(){
      return this.propResults;
    }
  },
  mounted: function(){
    if(this.results.length){
        this.size = this.results.length;
        this.setPages(this.results.length);
      }
  },
  watch: {
    results: function(val){
      console.log(val)
      if(val.length){
        let previous = this.active - 1;
        this.size = val.length;
        this.setPages(val.length);
      }
    }
  },
  methods: {
    /* for server-side */
    preFetch(){
      return this.$store.dispatch('actionProducts')
    },
    setPages(len) {
      if (len <= this.perPage) {
        this.pages = 0;
        return;
      }
      const pages = Math.ceil(len / this.perPage);
      this.pages = pages;
      this.navigate(this.active); //When there're no pages to redirect to the previous
    },
    navigate(indexPage) {
      const end = indexPage - 1;
      const offset = this.perPage * end;
      const visible = Object.values(this.results).splice(offset, this.perPage);
      this.$emit('setResults', visible);
      this.active = indexPage;
      this.$emit('setPage', this.active)
      if (this.dirty) this.checkDots();
    },
    checkDots() {
      if (this.pages <= this.maxAmountOfPages) {
        this.visiblePages = this.pages;
      } else {
        this.visiblePages = this.maxAmountOfPages;
        this.rightMax = true;
        this.leftMax = false;
      }
    },
    clickDots(dotName) {
      this.dirty = false;
      this.leftMax = true;
      this.rightMax = true;
      let obj;
      dotName === 'right' ? obj = this.rightDir() : obj = this.leftDir();
      [this.first, this.visiblePages] = obj;
      this.navigate(obj[0]);
    },
    rightDir() {
      let first;
      let last;
      let obj;
      last = this.visiblePages + this.maxAmountOfPages;
      first = this.visiblePages + 1;
      if (last >= this.pages) {
        last = this.pages;
        this.rightMax = false;
      }
      obj = [first, last];
      return obj;
    },
    leftDir() {
      let first; let last; let
        obj;
      last = this.first - 1;
      first = last - this.maxAmountOfPages;
      if (first === 1) this.leftMax = false;
      if (first <= 0) {
        first = 1;
        this.leftMax = false;
      }
      obj = [first, last];
      return obj;
    },
    range(min, max) {
      const array = [];
      let j = 0;
      for (let i = min; i <= max; i++) {
        array[j] = i;
        j++;
      }
      return array;
    },
  },
};
</script>
<style lang="less" scoped>
  @import "pagination.less";
</style>
