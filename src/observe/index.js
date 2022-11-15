import { newArrayProto } from './array'
import { isObject } from '../utils/index'
export function observe(data) {
  if (!isObject(data)) return // data不是对象就不用劫持
  // data.__ob__ instanceof Observe 为true表示data.__ob__为Observe实例，即已经被观测过了，不需要再观测了
  if (data.__ob__ instanceof Observe) {
    return data.__ob__
  }
  return new Observe(data)
}

// 观察者
class Observe {
  constructor(data) {
    // 将this绑定到data属性__ob__上，方便对新增数组元素进行观测，同时给数据加了标识，表示数据已经被观测过了
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false
    })
    if (Array.isArray(data)) {
      // data 隐士原型指向重写数组原型对象
      data.__proto__ = newArrayProto
      this.observeArray(data)
    } else {
      this.walking(data)
    }
  }
  // 迭代对象
  walking(data) {
    Object.keys(data).forEach((key) => defineReactive(data, key, data[key])) // 遍历 data 对象属性，依次执行defineReactive方法进行数据劫持
  }
  // 迭代数组
  observeArray(data) {
    data.forEach((item) => observe(item))
  }
}
/**
 * defineReactive 通过Object.defineProperty api 对数据进行数据劫持
 * @param target 目标数据对象
 * @param key 属性
 * @param value 值
 */
export function defineReactive(target, key, value) {
  observe(value) // 深层次对象递归
  Object.defineProperty(target, key, {
    get() {
      console.log('访问属性' + key)
      // 访问属性时候执行
      return value
    },
    set(newValue) {
      console.log('修改属性' + key)
      // 修改属性值时候执行
      if (value === newValue) return // 新值和旧值相等就不用赋值
      observe(newValue) // 新值仍然可能是引用类型，需要继续观测
      value = newValue // 新值赋值给属性
    }
  })
}
