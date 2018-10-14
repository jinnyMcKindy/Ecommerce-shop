<template>
    <div>
        <Products :figures="figures"
                  v-on:buy="removeItem"
                  >
        </Products>
    </div>
</template>

<script>
    import Products from "./Products";
    export default {
        name: "Basket",
        data : function(){
         return {
             figures: []
          }
        },
        created : function(){
                this.figures = this.$store.state.basket;
        },
        components : { Products },
        methods : {
            removeItem : function(figure){
                this.$store.commit("deleteProduct", figure);
            }
        }
    }
</script>

<style scoped>

</style>