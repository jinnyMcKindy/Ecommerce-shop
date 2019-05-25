import Vue from 'vue';

function init() {
  Vue.directive('currency', {
    bind: function (el, binding, vnode) { 
      let value = binding.value;
      el.innerHTML = `${value} руб.`
    }
  })
}
export { init };