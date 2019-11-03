<template>
  <td>
    <span v-if="type === 'input'">
      <input
        v-model="input"
        :type="subType === 'number' ? 'number' : 'text'"
        :value="value"
        class="input"
        @keyup="change"
      />
    </span>
    <span v-if="type === 'select'">
      <select v-model="input" :disabled="disabled" class="custom-select">
        <option
          v-for="(option, key) in options"
          :key="key"
          :disabled="disabled"
        >
          {{ option }}
        </option>
      </select>
    </span>
    <div v-if="type === 'textarea'">
      <textarea
        ref="textarea"
        v-model="input"
        class="textarea-inner"
        @keyup="change"
      />
    </div>
    <div v-if="type === 'checkbox'">
      <input :checked="value" type="checkbox" class="form-check-input" />
    </div>
  </td>
</template>
<script>
export default {
  name: "Input",
  props: {
    value: { type: Boolean, default: false },
    type: { type: String, default: "input" },
    disabled: { type: Boolean, default: false },
    options: {
      type: Array,
      default: function() {
        return [];
      }
    },
    subType: { type: String, default: "text" }
  },
  data() {
    return {};
  },
  computed: {
    input: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("changeInput", newValue);
      }
    }
  },
  methods: {}
};
</script>
<style></style>
