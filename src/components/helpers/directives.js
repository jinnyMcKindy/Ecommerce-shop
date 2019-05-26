import Vue from 'vue';

let callback = function(el, binding, vnode) { 
  	let value = binding.value;
  	el.innerHTML = `${value} руб.`
}
function init() {
  Vue.directive('currency', {
    bind: callback,
    update: callback,
    unbind: callback
  })
}
export { init };