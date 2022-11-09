export function observe(data) {
  if (typeof data !== 'object' && data !== 'null') return // data不是对象就不用劫持
  return new Observe(data)
}

class Observe {
  constructor(data) {
    this.walking(data)
  }
  walking(data) {
    Object.keys(data).forEach((key) => defineReactive(data, key, data[key])) // 遍历 data 对象属性，依次执行defineReactive方法进行数据劫持
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
      // 访问属性时候执行
      return value
    },
    set(newValue) {
      // 修改属性值时候执行
      if (value === newValue) return // 新值和旧值相等就不用赋值
      value = newValue
    }
  })
}
