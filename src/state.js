import { observe } from './observe/index'
/**
 * initState 初始化状态，进行data computed watch props等属性的初始化
 * @param vm 实例对象
 */
export const initState = function (vm) {
  const options = vm.$options
  if (options.data) {
    initData(vm)
  }
  // ...还会有其他属性的初始化操作
}
/**
 * initData 初始化数据，对data数据进行监测
 * @param vm 实例对象
 */
function initData(vm) {
  let data = vm.$options.data
  data = typeof data === 'function' ? data.apply(vm) : data // 判断data类型，可能是函数也可能是对象
  vm._data = data
  observe(data)
  // 遍历data属性，进行代理处理
  for (const key in data) {
    handleProxy(vm, '_data', key)
  }
}
/**
 * handleProxy 处理代理，当我们访问this.name的时候代理，实际访问的是this._data.name
 * @param vm 实例对象
 * @param target _data
 * @param key 属性
 */
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
