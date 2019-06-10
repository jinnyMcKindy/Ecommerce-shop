<template>
	<div class="container expand">
		<div v-if="!logged" class="admin">
			<div 
				class="error" 
				v-for="error in errors">
				{{error}}
			</div>
			<form>
				<div>
					<input 
						v-model="login"
						type="login" 
						class="form-control admin-control" />
				</div>
				<div>
					<input 
						v-model="pwd"
						type="password" 
						class="form-control admin-control" />
				</div>
				<div>
					<button 
						@click="authorise" 
						class="btn btn-info admin__btn">Войти</button>
				</div>
			</form>
		</div>
		<div v-else>
			<div class="right-align">
				<button 
					class="btn btn-default"
					@click="logout">
					Выход
				</button>
			</div>
			<div class="admin__table"> 
				<Table :table="table" />
				<div class="align-right">
					<button 
						class="btn btn-default"
						@click="save">
						Сохранить
					</button>
				</div>
			</div>
		</div>
</div>
</template>

<script>
import { cookie } from '../helpers/cookies.js'
import Table from '../elements/Table'
export default {
	name: "Admin",
	components: {
		Table
	},
	data: function(){
		return {
			logged: false,
			login: "",
			pwd: "",
			errors: [],
			table: {
				selectedPaid: 0,
				selectedSent: 1,
				optionsPaid: ["Оплачен", "Не оплачен"],
				optionsSent: ["Отправлен", "Не отправлен"],
				columns: [
				"ID", 
				"Цена", 
				"Продукты", 
				"Shipment details", 
				"Статус оплаты", 
				"Статус отправки"],
				rows: [ ["1" , "1200", ["test"], "Address"] ]
			}
		}
	},
	created: function(){
		let auth = cookie.getCookie("authorised");
		if(auth){
			this.logged = true;
		}
		this.$store.dispatch("actionOrders").then(data => {
        	console.log(data)
        	const details = [];
        	data.forEach((value) => {
        		let address = `Country: ${data.country}<br>
        		City: ${data.city}<br>
        		Address: ${data.address}<br>
        		Email: ${data.email} <br>
        		Index: ${data.index} <br>
        		Name: ${data.name} <br>
        		Phone: ${data.phone} <br>
        		`;
        		details.push(data._id, data.totalPrice, data.products, address);
        		this.table.rows.push(details);
        	})
      	}, 
      	error => console.log(error));
	},
	methods: {
		authorise: function(ev){
			ev.preventDefault()
			this.errors = this.validate()
			let obj = { login: this.login, password: this.pwd};
			if(!this.errors.length) this.$store.dispatch("authorise", obj).then(() => {
				cookie.setCookie("authorised", true);
				this.logged = true;
			}, err => { 
				this.errors.push("Пароль или логин не верны")
				this.logged = false; 
			})
		},
		save: function(){
			console.log(this.table)
		},
		validate: function(){
			let error = []
			error = this.validateInput(this.login, "логин", error)
			error = this.validateInput(this.pwd, "пароль", error)
			return error;
		},
		validateInput(str, property, errors){
			if(!str) { 
				errors.push(`Введите ${property}`); 
			}
			else if(str.length < 4) { 
				errors.push(`Слишком короткий ${property}`) 
			}
			return errors;
		},
		logout(){
			this.logged = false;
			cookie.deleteCookie("authorised")
		}
	}
}
</script>

<style scoped>
.admin {
	text-align: center;
	max-width: 500px;
	margin: auto;
}
.admin-control {
	margin-bottom: 10px;
}
.admin__btn {
	width: 100%;
}
.right-align {
	text-align: right;
}
.admin__table {
	margin-top: 10px;
}
.align-right {
	text-align: right;
}
</style>