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
	      	v-for="(row, index) in rows"
	      	class="table__td"
	      	:class="{'table__id': index===0}"
	      	>
	  		<span v-if="!Array.isArray(row)" v-html="row">
	  		</span>
	  		<span v-else>
	  			<p>
				  <button class="btn btn-primary btn-details" type="button" 
				  :disabled="!row.length"
				  data-toggle="collapse" :data-target="`#collapse${index}${rindex}`" 
				  aria-expanded="false" :aria-controls="`#collapse${index}${rindex}`">
				    Показать
				  </button>
				</p>
				<div class="collapse" :id="`collapse${index}${rindex}`" >
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
	          :value="table.optionsStatus[table.selectedStatus]"
	          type="select"
	          :options="table.optionsStatus"
	          v-on:changeInput="(args) => change(args, rows[0])"
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
.btn-details {
	width: 250px;
}
.table__list {
	max-width: 250px;
}
</style>