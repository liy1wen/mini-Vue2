import { initState } from './state'
import { query } from '../utils/index'
// 给Vue原型添加_init方法
export const initMixin = (Vue) => {
  Vue.prototype._init = function (options) {
    const vm = this
    // 将options挂载在实例上，以$开头，和$set、$nextTick一样的命名规则
    vm.$options = options
    // 初始化状态
    initState(vm)

    // 判断传入的options是否有根元素
    if (vm.$options.el) {
      // 执行挂载元素方法
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    // 获取元素
    el = el && query(el)
    const options = this.$options
    // 判断元素是否直接挂载到body上
    if (el === document.body || el === document.documentElement) {
      console.warn(`Do not mount Vue to <html> or <body> - mount to normal elements instead.`)
      return this
    }
    // 没有render函数
    if (!options.render) {
      let template
      // 有template属性，采用template
      if (options.template) {
        template = options.template
      } else if (el) {
        // 没有template属性，采用el.outerHTML
        template = el.outerHTML
      }
      console.log(template, 'template')
    }
  }
}
