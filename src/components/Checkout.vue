<template>
		<Details
			v-if="figures.length"
			class="details"
	        @close="toHome">
	            <div 
	            	class="details__figures" 
	            	slot="figures">
	            </div>
	            <div 
	            	class="details__price" 
	            	slot="price">
	            	Сумма заказа: <span v-currency="price"></span>
	        	</div>
	    </Details>
</template>

<script>
import Details from './Details';
export default {
	name: "Checkout",
	components: {
		Details
	},
	data: function(){
		return {
			figures: [],
			price: 0
		}
	},
	created: function(){
		this.figures = this.$store.getters.getBasket;
		this.price = this.$store.getters.getTotalPrice;
		if(!this.figures.length) this.$router.push({ name: "home" })
	},
	methods: {
		toHome: function(){
			this.$store.commit("deleteAll")
			this.$router.push({ name: "home" })
		}
	}
}
</script>

<style>
	.details__price {
		margin-bottom: 20px;
	}
</style>