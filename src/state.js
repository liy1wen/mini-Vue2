import { observe } from './observe/index'
/**
 * Vue 初始化状态，进行data computed watch props等属性的初始化
 * @param vm 实例对象
 */
export const initState = function (vm) {
  const options = vm.$options
  if (options.data) {
    initData(vm)
  }
  // ...还会有其他属性的初始化操作
}
function initData(vm) {
  let data = vm.$options.data
  data = typeof data === 'function' ? data.apply(vm) : data // 判断data类型，可能是函数也可能是对象
  vm._data = data
  observe(data)
  for (const key in data) {
    handleProxy(vm, '_data', key)
  }
}
function handleProxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key]
    },
    set(newValue) {
      vm[target][key] = newValue
    }
  })
}
