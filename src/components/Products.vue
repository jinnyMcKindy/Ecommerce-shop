<template>
   <div>
       <ul v-for="(figure, index) in figures" class="wrapper list-group">
           <li class="list-group-item active" v-on:click="expand(figure.name)">
               {{figure.name}}
               <div class="buttons">
                   <Button v-if="showButton" v-bind:text="'Купить'" class="btn btn-info" :figure="figure" v-on:buy="buy">
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
</template>

<script>
    import Button from "./Button";
    export default {
        name: "Products",
        props : ["figures", "showButton", "activeNames", "basket"],
        components : { Button },
        data : function() {
            return {

            }
        }
    }
</script>

<style scoped>

</style>