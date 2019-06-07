<template>
	<div>
	<table class="table admin__table">
	  <thead>
	    <tr>
	      <th 
	      v-for="(column, index) in table.columns" 
	      scope="col">
	      	{{column}}
	      </th>
	    </tr>
	  </thead>
	  <tbody>
	    <tr>
	      <td 
	      	v-for="(row, index) in table.rows">
	  		{{row}}
	  	  </td>
	      <Input 
	          :value="table.optionsPaid[table.selectedPaid]"
	          type="select"
	          :options="table.optionsPaid"
	          v-on:changeInput="change"
	      />
	      <Input 
	          :value="table.optionsSent[table.selectedSent]"
	          type="select"
	          :options="table.optionsSent"
	          v-on:changeInput="change"
	      />
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
			return {
				
			}
		},
		props: ["table"],
		methods: {
			change: function(input){
				console.log(inputs)
			}
		}
	}
</script>
<style>
	.admin__table {
		font-size: 16px;
	}
</style>