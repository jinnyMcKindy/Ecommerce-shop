<template>
	<div class="container expand">
		<div v-if="!logged" class="admin">
			<div 
				class="error" 
				v-for="er in error">
				{{er}}
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
			<div> admin </div>
		</div>
</div>
</template>

<script>
import { cookie } from '../helpers/cookies.js'
export default {
	name: "Admin",
	data: function(){
		return {
			logged: false,
			login: "",
			pwd: "",
			error: ""
		}
	},
	created: function(){
		let auth = cookie.getCookie("authorised");
		if(auth){
			this.logged = true;
		}
	},
	methods: {
		authorise: function(ev){
			ev.preventDefault()
			this.error = this.validate()
			let obj = { login: this.login, password: this.pwd};
			if(!this.error.length) this.$store.dispatch("authorise", obj).then(() => {
				cookie.setCookie("authorised", true);
				this.logged = true;
			}, err => { 
				this.error.push("Пароль или логин не верны")
				this.logged = false; 
			})
		},
		validate: function(){
			let error = []
			error = this.validateInput(this.login, "логин", error)
			error = this.validateInput(this.pwd, "пароль", error)
			return error;
		},
		validateInput(str, property, error){
			if(!str) { 
				error.push(`Введите ${property}`); 
			}
			else if(str.length < 4) { 
				error.push(`Слишком короткий ${property}`) 
			}
			return error;
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
</style>