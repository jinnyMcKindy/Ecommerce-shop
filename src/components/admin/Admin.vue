<template>
	<div class="container admin expand">
		<div v-if="!logged">
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
			admin
		</div>
</div>
</template>

<script>
import * as cookies from '../helpers/cookies.js'
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
	methods: {
		authorise: function(ev){
			ev.preventDefault()
			this.error = this.validate()
			let obj = { login: this.login, password: this.pwd};
			if(!this.error.length) this.$store.dispatch("authorise", obj).then(() => {
				console.log("logged")
				console.log(cookies)
				this.logged = true;
			}, err => { 
				console.log("not logged", err)
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
</style>