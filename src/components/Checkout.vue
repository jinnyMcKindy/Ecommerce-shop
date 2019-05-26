<template>
		<Details
			v-if="figures.length"
			class="details"
	        @close="toHome">
	            <div 
	            	class="details__figures" 
	            	slot="figures">
	 				<Products :figures="figures">
		                <div slot-scope="buttons"></div>
		            </Products>
	            </div>
	            <div 
	            	class="details__price" 
	            	slot="price">
	            	К оплате: <span v-currency="price"></span>
	        	</div>
	    </Details>
</template>

<script>
import Details from './details/Details';
import Products from './Products';
export default {
	name: "Checkout",
	components: {
		Details,
		Products
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

<style lang="less">
	.details__price {
		margin-bottom: 20px;
		.product__price {
			float: right;
		}
	}
	.details__figures {
		margin-bottom: 10px;
	}
</style>