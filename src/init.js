import { initState } from './state'
// 给Vue原型添加_init方法
export const initMixin = (Vue) => {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options // 将options挂载在实例上，以$开头，和$set、$nextTick一样的命名规则
    initState(vm) // 初始化状态
  }
}
