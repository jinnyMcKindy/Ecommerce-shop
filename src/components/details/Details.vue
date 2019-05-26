<template>
	<transition name="modal">
		<div class="details">
			<slot name="figures"></slot>
			<slot name="price"></slot>
			<div class="details__form">
				<form>
				  <div class="form-group">
				    <label for="contacts">Контактная информация <span class="red">*</span></label>
				    <input type="text" class="form-control" placeholder="Иванов Иван Иванович">
				  </div>
				  <div class="form-group">
				    <label>Email address<span class="red">*</span></label>
				    <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="ivanov@mail.ru">
				    <small id="emailHelp" class="form-text text-muted">Для подтверждения заказа и оплаты</small>
				  </div>
				  <div class="form-group">
				    <label>Телефон <span class="red">*</span></label>
				    <the-mask 
				    	mask="+7 (###) ###-##-##" 
				    	class="form-control"
				    	type="tel"
				    	placeholder="+7(926)880-88-88">
				    </the-mask>
				    <small id="emailHelp" class="form-text text-muted">Для службы доставки</small>
				  </div>
				  <div class="form-group">
				    <label>Страна<span class="red">*</span></label>
				    <input type="text" class="form-control" placeholder="Россия" value="Россия">
				  </div>
				  <div class="form-group">
				    <label>Город<span class="red">*</span></label>
				    <input type="text" class="form-control" placeholder="Москва">
				  </div>
				   <div class="form-group">
				    <label>Индекс</label>
				    <input type="text" class="form-control">
				  </div>
				  <div class="form-group">
				    <label>Адрес доставки<span class="red">*</span></label>
				    <input type="text" class="form-control">
				  </div>
				  <div>
				  	<small class="disclaimer">
				  	Нажимая «Подтвердить», я соглашаюсь с тем, что AliExpress сохраняет заполненную мной информацию и передаёт по требованию таможне, а также с условиями публичной оферты (подробная информация доступна здесь ( здесь).
				  	</small>
				  </div>
				  <button class="btn btn-info pull-right" @click="$emit('close')">
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
	name: "Details"
}
</script>
<style lang="less">
	@import "details.less";
</style>
