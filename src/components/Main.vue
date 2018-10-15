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
    var url = "https://swapi.co/api/starships";
    var promise = new Promise((resolve, reject)=>{
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();
        if (xhr.status != 200) {
            reject( xhr.status + ': ' + xhr.statusText );
        } else {
            resolve( xhr.responseText );
        }
    });
    function parseData(data) {
        var results = JSON.parse(data).results;
        var keys = Object.keys(results[0]);
        if(results.length){
            results = results.map((result)=>{
                result.price = (Math.random() * 1000).toFixed(2);
                keys.map((key)=>{
                    var property = result[key];
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
                    var result = parseData(data);
                    if(result){
                        this.figures = result.results;
                    }
                });
            },
            addProduct: function(figure){
                var name = figure.name;
                this.basket.push(name);
                this.$store.commit("addProduct", figure);
            },
            deleteProduct: function(figure){
                var name = figure.name;
                var index = this.basket.indexOf(name);
               this.basket.splice(index, 1);
                this.$store.commit("deleteProduct", figure);
            },
            buy : function(figure){
                var name = figure.name;
                if(!this.$store.state.basket.length){
                    this.addProduct(figure);
                    return;
                }
                var basket = this.$store.state.basket;
                var includes = false;
                basket.forEach((item)=>{
                    if(item.name == name){
                        includes = true;
                    }
                })
                if( includes ){
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