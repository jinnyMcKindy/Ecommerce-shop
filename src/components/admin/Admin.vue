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
				<Table 
					@changeSelect="setStatus"
					:table="table" 
				/>
				<!--<div class="align-right">
					<button 
						class="btn btn-default"
						@click="save">
						Сохранить
					</button>
				</div>-->
			</div>
		</div>
</div>
</template>

<script>
import { cookie } from '../helpers/cookies.js'
import axios from "axios"
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
				selectedStatus: 0,
				optionsStatus: [
				"В работе", 
				"Отменен", 
				"Оплачен", 
				"Отправлен", 
				"Выслан линк на оплату"],
				columns: [
				"ID", 
				"Сумма", 
				"Продукты", 
				"Shipment details",
				"Статус"],
				rows: []
			}
		}
	},
	created: function(){
		let auth = cookie.getCookie("authorised");
		if(auth){
			this.logged = true;
		}
		this.$store.dispatch("actionOrders").then(data => {
        	data.forEach((value) => {
        		let address = {
					array: [],
					notEmpty(value, str){
						if(value) this.array.push(`${str}: ${value}`)
						return this;
					}
				}
        		const details = [];
        		address
        		.notEmpty(value.country, "Country")
        		.notEmpty(value.city, "City")
        		.notEmpty(value.address, "Address")
        		.notEmpty(value.email, "Email")
        		.notEmpty(value.index, "Index")
        		.notEmpty(value.name, "Name")
        		.notEmpty(value.phone, "Phone");
        		details.push(value._id, value.totalPrice, value.products, address.array);
        		this.table.rows.push(details);
        	})
      	}, 
      	error => console.log(error));
	},
	/** test **/
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
		setStatus: function(obj){
			let url = `${this.$store.getters.getHost}/setStatus`
			//axios.post(url, obj)
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

<style lang="less">
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
	td:nth-child(5){
		white-space: nowrap;
	}
	.table__id {
		max-width: 100px;
	    white-space: nowrap;
	    overflow: hidden;
	    display: block;
	    padding: 5px;
	    text-overflow: ellipsis;
	}
}
.align-right {
	text-align: right;
}
.admin__table {
	font-size: 16px;
	.list-group-item {
		padding:5px;
	}
}
</style>