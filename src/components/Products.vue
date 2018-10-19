<template>
   <div>
       <ul v-for="(figure, index) in figures" class="wrapper list-group">
           <li class="list-group-item active" v-on:click="expand(figure.name)">
               {{figure.name}}
               <div class="buttons">
                   <Button v-if="!showBuy(figure.name)" v-bind:text="'Купить'" class="btn btn-info" :figure="figure" v-on:buy="$emit('buy', figure)">
                   </Button>
                   <Button v-else v-bind:text="'Удалить'" class="btn btn-danger" :figure="figure" v-on:buy="$emit('buy', figure)">
                   </Button>
               </div>
           </li>
           <li class="list-group-item " v-if="activeNames.includes(figure.name)" v-for="(detail, key) in figure">
               {{key}} : {{detail}}
           </li>
       </ul>
   </div>
</template>

<script>
    import Button from "./Button";
    export default {
        name: "Products",
        props : ["figures", "basket"],
        components : { Button },
        data : function() {
            return {
                activeNames : [],
            }
        },
        methods : {
                showBuy: function(name){
                    const basket = this.$store.state.basket;
                    let exists = basket.filter( item => item.name == name );
                    return exists.length;
                },
            expand: function(name){
                if( this.activeNames.includes(name) ) {
                    let index = this.activeNames.indexOf(name);
                    this.activeNames.splice(index, 1); } else {
                    this.activeNames.push(name);
                }
            }
        }
    }
</script>

<style scoped>
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