<template>
	<transition name="modal">
		<div class="details">
			<slot name="figures"></slot>
			<form>
			  <div class="form-group">
			    <label for="exampleInputEmail1">Email address<span class="red">*</span></label>
			    <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
			    <small id="emailHelp" class="form-text text-muted">Для подтверждения заказа</small>
			  </div>
			  <div class="form-group">
			    <label for="exampleInputPassword1">Телефон <span class="red">*</span></label>
			    <input type="password" class="form-control" placeholder="+7(926)880-88-88">
			     <small id="emailHelp" class="form-text text-muted">Для службы доставки</small>
			  </div>
			  <div class="form-group">
			    <label for="exampleInputPassword1">Город доставки<span class="red">*</span></label>
			    <input type="password" class="form-control">
			  </div>
			   <div class="form-group">
			    <label for="exampleInputPassword1">Индекс</label>
			    <input type="password" class="form-control">
			  </div>
			  <div class="form-group">
			    <label for="exampleInputPassword1">Адрес доставки<span class="red">*</span></label>
			    <input type="password" class="form-control">
			  </div>
			  <slot name="price"></slot>
			<button class="btn btn-info pull-right" @click="$emit('close')">
	            Подтвердить заказ
	        </button>
			</form>
		</div>
	</transition>
</template>
<script>

</script>
<style>
.red {
	color: red;
}
.details {
	padding: 20px 10px;
}
.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
.pull-right {
	float: right;
}
</style>
