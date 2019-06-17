<template>
  <td>
    <span v-if="type === 'input'">
      <input
        :type="subType === 'number' ? 'number' : 'text'"
        :value="value"
        @keyup="change"
        class="input"
        v-model="input"
      />
    </span>
    <span v-if="type === 'select'">
      <select  class="custom-select" v-model="input">
        <option
          v-for="(option, key) in options"
          v-bind:key="key"
          :disabled="key == disabled"
          :selected="key === 0">
          {{ option }}
        </option>
      </select>
    </span>
    <div v-if="type === 'textarea'">
      <textarea 
       ref="textarea"
       class="textarea-inner"
       v-model="input"
       @keyup="change">  
       </textarea>
    </div>
    <div v-if="type === 'checkbox'">
      <input 
      :checked="value" 
      type="checkbox" 
      class="form-check-input" />
    </div>
  </td>
</template>
<script>
export default {
  name: 'Input',
  props: [
    'value', 
    'type', 
    'options', 
    'subType',
    'disabled'
  ],
  data: function(){
    return {
     input: this.value
    }
  },
  mounted: function(){
  },
  watch: { 
    'input': function() {
      this.$emit('changeInput', this.input)
    } 
  },
  methods: {}
}
</script>
<style>
  
</style>
