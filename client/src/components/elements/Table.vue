<template>
	<div>
	<table class="table admin__table">
	  <thead>
	    <tr>
	      <th 
	      v-for="(column, index) in table.columns" 
	      scope="col">
	      	<span>
	      		{{column}}
	      	</span>
	      </th>
	    </tr>
	  </thead>
	  <tbody>
	    <tr 
	    v-bind:key="productIndex"
	    v-for="(rows, productIndex) in table.rows">
	      <td 
	      	v-bind:key="index"
	      	v-for="(row, index) in rows"
	      	class="table__td"
	      	:class="{'table__id': index===0}">
	  		<span v-if="!Array.isArray(row)" v-html="row">
	  		</span>
	  		<span v-else>
	  			<p>
				  <button class="btn btn-primary btn-details" type="button" 
				  :disabled="!row.length"
				  data-toggle="collapse" :data-target="`#collapse${index}${productIndex}`" 
				  aria-expanded="false" :aria-controls="`#collapse${index}${productIndex}`">
				    Показать
				  </button>
				</p>
				<div class="collapse" :id="`collapse${index}${productIndex}`">
				  <div class="card ">
				    <ul class="list-group list-group-flush table__list">
		  				<li 
		  				class="list-group-item"
		  				v-bind:key="lindex"
		  				v-for="(list, lindex) in row">
		  					{{list}}
		  				</li>
		  			</ul>
				  </div>
				</div>
	  		</span>
	  	  </td>
	      <Input 
	          :value="table.optionsStatus[table.selectedStatus[productIndex]]"
	          type="select"
	          :disabled="table.selectedStatus[productIndex] === 1"
	          :options="table.optionsStatus"
	          v-on:changeInput="(args) => change(args, rows[0])"
	      />
      	  <td>
	    	<button 
	    	@click="change(1, rows[0])"
	    	:disabled="table.selectedStatus[productIndex] === 1"
	    	class="btn btn-warning">
	    		Товара нет
	    	</button>
	      </td>
	      <td>
	    	<button 
	    	@click="change(2, rows[0])"
	    	:disabled="table.selectedStatus[productIndex] === 2"
	    	class="btn btn-success">
	    		Линк
	    	</button>
	      </td>
	      <td>
	    	<button 
	    		class="btn btn-danger" 
	    		@click="$emit('deleteOrder', rows[0])"
	    		>
	    		<i class="fa fa-times"></i>
	    	</button>
	      </td>
	    </tr>
	  </tbody>
	</table>
	</div>
</template>
<script>
import Input from './Input'
	export default {
		name: "Table",
		components: {
			Input
		},
		data: function(){
			return {}
		},
		props: ["table"],
		methods: {
			change: function(input, id){
				this.$emit('changeSelect', { input, id })
			}
		}
	}
</script>
<style>
.table__list {
	max-width: 250px;
}
</style>