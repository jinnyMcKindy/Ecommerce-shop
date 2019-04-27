<template>
    <div class="container basket">
        <div v-if="!showModal">
            <Products :figures="figures"
                v-on:buy="removeItem" >
            </Products>
            <div class="basket__price" v-if="figures.length">
                Сумма заказа: {{totalPrice}}
            <button  class="btn btn-info pull-right"
                    type="button"
                    id="show-modal" @click="showModal = true">Оформить заказ</button>
            </div>
        </div>
        <Details 
            v-if="showModal" 
            @close="closeModal">
                <div slot="figures">{{figures}}</div>
                <div slot="price">Сумма заказа: {{totalPrice}}</div>
            </Details>
    </div>
</template>
<script>
    import Products from "./Products";
    import modal from "./modal";
    import Details from "./Details";
    export default {
        name: "Basket",
        data: function(){
         return {
             figures: [],
             showModal: false
          }
        },
        created: function(){
                this.figures = this.$store.state.basket;
        },
        components: { Products, Details },
        computed: {
          totalPrice : function(){
              return this.$store.state.totalPrice;
          }
        },
        methods: {
            clicked : function(){
                console.log("clicked");
            },
            removeItem : function(figure){
                this.$store.commit("deleteProduct", figure);
            },
            closeModal: function() {
                this.showModal = false;
                this.figures = [];
                this.$store.commit("deleteAll");
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
.dum {
    color : black;
}
.pull-right {
    float: right;
}
.basket {
    min-height: calc(100vh - 200px);
}
.basket__price {
    margin-top: 10px;
    padding:10px;
}
</style>