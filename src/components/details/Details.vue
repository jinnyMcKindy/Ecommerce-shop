<template>
	<transition name="modal">
		<div class="details">
			<slot name="figures"></slot>
			<slot name="price"></slot>
			<div class="details__form">
				<div v-if="error.send" class="alert alert-danger" role="alert">
				  Ошибка отправки:
				  {{error.send}}
				</div>
				<form>
				  <div class="form-group">
				    <label for="contacts">Контактная информация <span class="red">*</span></label>
				    <input 
				    	v-model="obj.name"
				    	required
				    	type="text" 
				    	class="form-control" 
				    	placeholder="Иванов Иван Иванович">
				  </div>
				  <div class="form-group">
				    <label>Email <span class="red">*</span></label>
				    <input 
				    	v-model="obj.email"
				    	required 
				    	type="email" 
				    	class="form-control" 
				    	aria-describedby="emailHelp" 
				    	placeholder="ivanov@mail.ru">
				    <small id="emailHelp" class="form-text text-muted">Для подтверждения заказа и оплаты</small>
				  </div>
				  <div class="form-group">
				    <label>Телефоны <span class="red">*</span></label>
				    <the-mask 
				    	v-model="obj.phone"
				    	required
				    	mask="+7 (###) ###-##-##" 
				    	class="form-control"
				    	type="tel"
				    	placeholder="+7(926)880-88-88">
				    </the-mask>
				    <small id="emailHelp" class="form-text text-muted">Для службы доставки</small>
				  </div>
				  <div class="form-group">
				    <label>Страна <span class="red">*</span></label>
				    <input 
				    	v-model="obj.country"
				    	required
				    	type="text" 
				    	class="form-control" 
				    	placeholder="Россия" 
				    	value="Россия">
				  </div>
				  <div class="form-group">
				    <label>Город <span class="red">*</span></label>
				    <input 
				    	v-model="obj.city"
				    	required
				    	type="text" 
				    	class="form-control" 
				    	placeholder="Москва">
				  </div>
				   <div class="form-group">
				    <label>Индекс</label>
				    <input 
				    	v-model="obj.index"
				    	type="text" 
				    	class="form-control">
				  </div>
				  <div class="form-group">
				    <label>Адрес доставки <span class="red">*</span></label>
				    <input 
				    	v-model="obj.address"
				    	required
				    	type="text" 
				    	class="form-control">
				  </div>
				  <div>
				  	<small class="disclaimer">
				  	Нажимая «Подтвердить», я соглашаюсь с тем, что AliExpress сохраняет заполненную мной информацию и передаёт по требованию таможне, а также с условиями публичной оферты (подробная информация доступна здесь ( здесь).
				  	</small>
				  </div>
				  <button 
				  	class="btn btn-info pull-right" 
				  	@click="confirmOrder">
			            Подтвердить заказ
			      </button>
			      <div class="clear"></div>
				</form>
		</div>
		</div>
	</transition>
</template>
<script>
export default {
	name: "Details",
	data: function(){
		return {
			obj: {
				phone: "",
				address: "",
				index: "",
				city: "",
				country: "",
				email: "",
				name: "",
				products: this.$store.getters.getBasket.map(value => value._id)
			},
			error: {}
		}
	},
	methods: {
		confirmOrder: function(event){
			this.validateForm(event)
		},
		validateForm: function(event){
			//console.log(this.obj)
			 if(
				this.obj.phone &&
				this.obj.address &&
				this.obj.city &&
				this.obj.country &&
				this.obj.email &&
				this.obj.name &&
				this.obj.email.indexOf("@") > -1
			){ 
				this.obj.totalPrice = this.$store.getters.getTotalPrice;
				this.$store.dispatch("saveOrder", this.obj).then(
					data => { 
						console.log(data) 
						this.$emit('close')
					}, 
					err => { 
						console.log(err) 
						this.error.send = err;
					})
				event.preventDefault()
			}
		}
	}
}
</script>
<style lang="less">
	@import "details.less";
</style>
