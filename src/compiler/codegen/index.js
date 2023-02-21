function genProps(props) {
  let str = ''
  props.forEach((prop) => {
    // 单独处理 style 类型
    if (prop.name === 'style') {
      let obj = {}
      prop.value.split(';').forEach((item) => {
        const [key, val] = item.split(':')
        obj[key] = val
      })
      prop.value = obj
    }
    str += `${JSON.stringify(prop.name)}:${JSON.stringify(prop.value)},`
  })
  return `{ ${str.slice(0, -1)} }`
}
function genChildren(children) {
  if (children) {
    return children.map((c) => gen(c)).join(',')
  }
}
function gen(node) {
  if (node.type === 1) {
    return generate(node)
  } else {
    return 'xxx'
  }
}
export const generate = (ast) => {
  let children = genChildren(ast.children)
  const code = `_c('${ast.tag}', ${ast.attrsList.length > 0 ? genProps(ast.attrsList) : 'null'}${ast.children.length ? `,${children}` : ''}) `
  console.log(code)
}
