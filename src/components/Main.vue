<template>
    <div class="container">
        <Products :figures="figures"
                  v-on:buy="buy"
                  :basket="basket">
        </Products>
    </div>
</template>
<script>
import Products from './Products';

const url = 'https://swapi.co/api/starships';
const promise = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();
  if (xhr.status != 200) {
    reject(`${xhr.status}: ${xhr.statusText}`);
  } else {
    resolve(xhr.responseText);
  }
});
function parseData(data) {
  let { results } = JSON.parse(data);
  const keys = Object.keys(results[0]);
  if (results.length) {
    results = results.map((result) => {
      result.price = (Math.random() * 1000).toFixed(2);
      keys.map((key) => {
        let property = result[key];
        if (Array.isArray(property)) property = property.join(' ');
        result[key] = property;
      });
      return result;
    });
    return { results };
  }
}
export default {
  name: 'Main',
  data() {
    return {
      figures: [],
      basket: [],
    };
  },
  components: { Products },
  created() {
    this.getData();
    setInterval(() => {
      this.getData();
    }, 60000);
  },
  methods: {
    getData() {
      promise.then((data) => {
        const result = parseData(data);
        if (result) {
          this.figures = result.results;
        }
      });
    },
    addProduct(figure) {
      const { name } = figure;
      this.basket.push(name);
      this.$store.commit('addProduct', figure);
    },
    deleteProduct(figure) {
      const { name } = figure;
      const index = this.basket.indexOf(name);
      this.basket.splice(index, 1);
      this.$store.commit('deleteProduct', figure);
    },
    buy(figure) {
      const { name } = figure;
      const { basket } = this.$store.state;
      const exists = basket.filter(item => item.name == name);
      if (exists.length) {
        this.deleteProduct(figure);
      } else {
        this.addProduct(figure);
      }
    },

  },
};
</script>
<style scoped>

</style>
