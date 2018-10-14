<template>
    <div>
        <div v-model="activeNames">
        <ul v-for="(figure, index) in figures" class="wrapper list-group">
                <li class="list-group-item active" v-on:click="expand(figure.name)">
                    {{figure.name}}
                   <div class="buttons">
                       <Button v-if="!basket.includes(figure.name)" v-bind:text="'Купить'" class="btn btn-info" :figure="figure" v-on:buy="buy">
                       </Button>
                       <Button v-else v-bind:text="'Удалить'" class="btn btn-danger" :figure="figure" v-on:buy="buy">
                       </Button>
                   </div>
                </li>
            <li class="list-group-item " v-if="activeNames.includes(figure.name)" v-for="(detail, key) in figure">
               {{key}} : {{detail}}
            </li>
        </ul>
        </div>
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
                activeNames : [],
                basket : []
            }
        },
        components : { Products },
        created : function() {
            this.getData();
            setInterval(() => {
              //  this.getData();
            }, 60000);
        },
        methods : {
            getData : function(){
                promise.then((data)=>{
                    var result = parseData(data);
                    if(result){
                        this.figures = result.results;
                        console.log(this.figures);
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
                if( this.basket.includes(name) ){
                    this.deleteProduct(figure);
                } else {
                    this.addProduct(figure);
                }
            },
            expand : function(name){
                if( this.activeNames.includes(name) ) {
                    var index = this.activeNames.indexOf(name);
                    this.activeNames.splice(index, 1); } else {
                    this.activeNames.push(name);
                }
            }
        }
    }

</script>

<style scoped>
table {
    font-size: 14px;
}
.buttons {
    float: right;
}
li {
    margin: 5px;
}
.active  {
    cursor: pointer;
}
</style>