<template>
  <div>
    <div class="c2c-pagination">
      <DotComponent
        :max="leftMax"
        class="paginationItem"
        :icon="setPath('double-left.svg')"
        value="toStart"
        @click-dots="clickDots"
      />
      <DotComponent
        :max="leftMax"
        class="paginationItem"
        :icon="setPath('back.svg')"
        value="left"
        @click-dots="clickDots"
      />
      <PageComponent
        v-for="page in range(first, visiblePages)"
        :key="page.id"
        :ref="`page-${page}`"
        class="paginationItem"
        :page="page"
        :class="pageClass(page)"
        @navigate-of="navigate(page)"
      />
      <DotComponent
        :max="rightMax"
        :icon="setPath('next.svg')"
        value="right"
        class="paginationItem"
        @click-dots="clickDots"
      />
      <DotComponent
        :max="rightMax"
        class="paginationItem"
        :icon="setPath('double-right.svg')"
        value="toEnd"
        @click-dots="clickDots"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PageComponent from "./PageComponent";
import DotComponent from "./DotComponent";

export default {
  name: "Pagination",
  components: {
    PageComponent,
    DotComponent
  },
  props: {
    type: { type: String, default: "" },
    propResults: {
      type: Array,
      default: function() {
        return [];
      }
    },
    maxAmountOfPages: { type: Number, default: 3 },
    perPage: { type: Number, default: 5 },
    activePage: { type: Number, default: 1 }
  },
  data() {
    return {
      text: "",
      shownotfound: false,
      pages: 0,
      visiblePages: 0,
      rightMax: false,
      leftMax: false,
      first: 1,
      dirty: true,
      oldUrl: "",
      size: 0,
      active: this.activePage
    };
  },
  computed: {
    results: function() {
      return this.propResults;
    },
    ...mapState(["pagination"])
  },
  watch: {
    results: function(val) {
      console.log("watch", this.active, this.activePage, this.results.length);
      if (val.length) {
        this.size = val.length;
        this.setPages(val.length);
      }
    }
  },
  beforeDestroy: function() {
    this.$store.commit("setPagination", {
      type: this.type,
      val: {
        pages: this.pages,
        visiblePages: this.visiblePages,
        first: this.first,
        rightMax: this.rightMax,
        leftMax: this.leftMax,
        dirty: this.dirty,
        active: this.active
      }
    });
  },
  mounted: function() {
    //console.log("mounted", this.activePage);
    let pagSettings = this.pagination[this.type];
    this.pages = pagSettings.pages;
    this.visiblePages = pagSettings.visiblePages;
    this.first = pagSettings.first;
    this.rightMax = pagSettings.rightMax;
    this.leftMax = pagSettings.leftMax;
    this.dirty = pagSettings.dirty;
    if (this.type === "products") this.active = pagSettings.active; //To highlight active page
    if (this.results.length) {
      this.size = this.results.length;
      this.setPages(this.results.length);
    }
  },
  methods: {
    setPath: function(path) {
      return `${path}`;
    },
    pageClass: function(page) {
      return ["page-" + page, this.active == page ? "active" : ""];
    },
    setPages(len) {
      //console.log(len, this.activePage, this.active)
      if (len === this.perPage) {
        this.pages--;
        this.navigate(this.active);
      } else if (len < this.perPage) {
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
      this.$emit("setResults", visible);
      this.active = indexPage;
      this.$emit("setPage", this.active);
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
      if (dotName === "toEnd") {
        this.rightMax = false;
        this.first = this.pages - this.maxAmountOfPages;
        this.visiblePages = this.pages;
        this.navigate(this.pages);
        return;
      }
      if (dotName === "toStart") {
        this.leftMax = false;
        this.first = 1;
        this.visiblePages = this.maxAmountOfPages;
        this.navigate(1);
        return;
      }
      let obj;
      dotName === "right" ? (obj = this.rightDir()) : (obj = this.leftDir());
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
      let first;
      let last;
      let obj;
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
    }
  }
};
</script>
<style lang="less" scoped>
@import "pagination.less";
</style>
