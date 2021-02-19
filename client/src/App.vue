<template>
  <div id="app">
    <Menu class="menu-light" />
    <div class="container main-container">
      <div class="row">
        <div class="col col-md-12 main">
          <router-view />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import init from "@/components/helpers/filters.js";
  console.log(process.env)
init();
export default {
  name: "App",
  components: {
    Menu,
    Footer
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.menu-light {
  border-bottom: 1px solid #e9e9e9;
  background-color: #f8f8f8;
  padding-right: 10px;
  padding-left: 10px;
}
.main {
  margin-top: 20px;
  margin-bottom: 20px;
}

</style>
