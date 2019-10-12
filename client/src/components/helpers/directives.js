import Vue from 'vue';

function callback(el, binding) {
  	const { value } = binding;
  	el.innerHTML = `${value}`;
};
function init() {
  Vue.directive('currency', {
    bind: callback,
    update: callback,
    unbind: callback,
  });
}
export default init;
