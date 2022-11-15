/**
 * Query an element selector if it's not an element already.
 */
export function query(el) {
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected) {
      console.warn('Cannot find element: ' + el)
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

// 判断数据是否为对象
export function isObject(data) {
  return !(typeof data !== 'object' && data !== 'null')
}
