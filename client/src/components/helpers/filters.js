import Vue from 'vue';

function init() {
	Vue.filter('currency', function (value) {
	  if (!value) return ''
	  return `${value}`;
	})
}
export default init;
