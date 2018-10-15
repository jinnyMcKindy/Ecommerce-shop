<template>
    <div>
        <Products :figures="figures"
                  v-on:buy="removeItem" >
        </Products>
        <div v-if="figures.length">
            Общая цена: {{totalPrice}}
            <button class="btn btn-info pull-right"
                    type="button"
                    id="show-modal" @click="showModal = true">Оформить заказ</button>
            <modal v-if="showModal" @close="closeModal">
                <h3 slot="header">Оформить заказ</h3>
            </modal>
        </div>
    </div>
</template>

<script>
    import Products from "./Products";
    import VueRouter from 'vue-router'
    import modal from "./modal";
    export default {
        name: "Basket",
        data : function(){
         return {
             figures: [],
             showModal: false
          }
        },
        created : function(){
                this.figures = this.$store.state.basket;
        },
        components : { Products, modal },
        computed : {
          totalPrice : function(){
              return this.$store.state.totalPrice;
          }
        },
        methods : {
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
.pull-right {
    float: right;
}
</style>