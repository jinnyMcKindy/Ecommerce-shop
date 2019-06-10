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
	    v-bind:key="rindex"
	    v-for="(rows, rindex) in table.rows">
	      <td 
	      	v-bind:key="index"
	      	v-for="(row, index) in rows">
	  		<span v-if="!Array.isArray(row)"> 
	  			{{row}}
	  		</span>
	  		<span v-else>
	  			<ul>
	  				<li 
	  				v-bind:key="lindex"
	  				v-for="(list, lindex) in row">
	  					{{list}}
	  				</li>
	  			</ul>
	  		</span>
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
				console.log(input)
			}
		}
	}
</script>
<style>
	.admin__table {
		font-size: 16px;
	}
</style>