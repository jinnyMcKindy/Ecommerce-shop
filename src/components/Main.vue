<template>
    <div>
            <Products :figures="figures"
                      v-on:buy="buy"
                      :basket="basket"
                      >
            </Products>
    </div>
</template>

<script>

 import Products from "./Products";
    let url = "https://swapi.co/api/starships";
    let promise = new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();
        if (xhr.status != 200) {
            reject( xhr.status + ': ' + xhr.statusText );
        } else {
            resolve( xhr.responseText );
        }
    });
    function parseData(data) {
        let results = JSON.parse(data).results;
        let keys = Object.keys(results[0]);
        if(results.length){
            results = results.map((result)=>{
                result.price = (Math.random() * 1000).toFixed(2);
                keys.map((key)=>{
                    let property = result[key];
                    if( Array.isArray(property) ) property = property.join(" ");
                    result[key] = property;
                });
                return result;
            });
            return { results };
        }
    }
    export default {
        name: "Main",
        data : function() {
            return  {
                figures : [],
                basket : []
            }
        },
        components : { Products },
        created : function() {
            this.getData();
            setInterval(() => {
                this.getData();
            }, 60000);
        },
        methods : {
            getData : function(){
                promise.then((data)=>{
                    let result = parseData(data);
                    if(result){
                        this.figures = result.results;
                    }
                });
            },
            addProduct: function(figure){
                let name = figure.name;
                this.basket.push(name);
                this.$store.commit("addProduct", figure);
            },
            deleteProduct: function(figure){
                let name = figure.name;
                let index = this.basket.indexOf(name);
                this.basket.splice(index, 1);
                this.$store.commit("deleteProduct", figure);
            },
            buy : function(figure){
                let name = figure.name;
                if(!this.$store.state.basket.length){
                    this.addProduct(figure);
                    return;
                }
                let basket = this.$store.state.basket;
                let includes = basket.filter(item => item.name == name);
                if( includes.length ){
                    this.deleteProduct(figure);
                } else {
                    this.addProduct(figure);
                }
            },

        }
    }
</script>
<style scoped>
</style>