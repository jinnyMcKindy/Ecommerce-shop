<template>
  <div>
    <div class="c2c-pagination">
         <dot-component
            :Max="leftMax"
            v-on:click-dots="clickDots"
            value="left"
            :icon="leftIcon">
         </dot-component>
         <page-component
            v-for="(page) in range(first, visiblePages)"
            :key="page.id"
            v-on:navigate-of="navigate(page)"
            :page="page"
            :ref="`page-${page}`"
            :class="['page-' + page, active == page ? 'active' : '']">
        </page-component>
        <dot-component
          :Max="rightMax"
          v-on:click-dots="clickDots"
          value="right"
          :icon="rightIcon">
        </dot-component>
     </div>
  </div>
</template>

<script>
import PageComponent from './PageComponent';
import DotComponent from './DotComponent';

export default {
  name: 'Pagination',
  props: ['leftIcon', 'rightIcon', 'results', 'maxAmountOfPages', 'perPage'],
  data() {
    return {
      text: '',
      shownotfound: false,
      size: 0,
      pages: 0,
      visiblePages: 0,
      rightMax: false,
      leftMax: false,
      first: 1,
      dirty: true,
      oldUrl: '',
      active: 0,
    };
  },
  components: {
    PageComponent,
    DotComponent,
  },
  mounted() {
    this.size = this.results.length; // количество найденных совпадений
    this.setPages(this.results.length); // высчитываем кол-во страниц для пагинации
  },
  methods: {
    setPages(len) {
      if (len <= this.perPage) {
        this.pages = 0;
        return;
      }
      const pages = Math.ceil(len / this.perPage);
      this.pages = pages;
      this.navigate(1);
    },
    navigate(indexPage) {
      const end = indexPage - 1;
      const offset = this.perPage * end;
      const visible = Object.values(this.results).splice(offset, this.perPage);
      //console.log(end, offset, visible, this.results)
      this.$emit('setResults', visible);
      this.active = indexPage;
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
      first = this.visiblePages+1;
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
      last = this.first-1;
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
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.page.active {
    color: red;
}
.container {
    margin: auto;
    max-width: 700px;
}
.c2c-pagination {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
.page {
    padding: 10px;
    cursor: pointer;
}
.c2c-dot {
    cursor: pointer;
}
</style>
