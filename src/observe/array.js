// 数组原型，拷贝到arrayProto
const arrayProto = Array.prototype
// 继承原有数组的方法 newArrayProto.__proto__ === arrayProto
export let newArrayProto = Object.create(arrayProto)
// 存放7个会改变原数组变异数组方法
const methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']

// 遍历7个变异数组方法，添加到拷贝出来的原型newArrayProto上
methodsToPatch.forEach((method) => {
  newArrayProto[method] = function (...args) {
    // 访问newArrayProto上的方法实则是访问的数组原型方法
    let result = arrayProto[method].apply(this, args)
    // 响应式处理,获取Observe实例
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 对新增的进行观测
    if (inserted) ob.observeArray(inserted)
    return result
  }
})
