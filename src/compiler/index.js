// 解析标签和属性的正则表达式
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/ //匹配到的是属性，如 a=b,key 是匹配到第一个分组，value 的值可能是 Group 3、Group 4、Group 5 其中的一个，即第三个分组，第四个分组和第五个分组其中一个。
const startTagOpen = new RegExp(`^<${qnameCapture}`) // 匹配到的分组是标签开始部分，如：<div
const startTagClose = /^\s*(\/?)>/ //匹配到的是开始标签的结束部分，如 > 或者 />。
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) // 匹配到的分组是标签结束部分，如 </div>
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // 匹配到的是我们表达式的内容，如 {{ name }}

export const compileToFunctions = (template) => {
  const ast = parseHTML(template)
}

function parseHTML(html) {
  while (html) {
    let textEnd = html.indexOf('<')
    // 表示的是标签开始位置或者结束位置
    if (textEnd === 0) {
      // 如果是标签开始位置
      const startTagMatch = parseStartTag()
      if (startTagMatch) {
        continue
      }
      // 如果是标签结束位置
      const endTagMatch = html.match(endTag)
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        continue
      }
    }
    let text
    // 表示的是文本结束位置，截取到文本结束位置
    if (textEnd > 0) {
      text = html.substring(0, textEnd)
    }
    // 表示的是内容全是文本,将内容全部都截取掉
    if (textEnd < 0) {
      text = html
    }
    if (text) {
      advance(text.length)
    }
  }
  console.log(html)
  // 截取掉被匹配到的模板部分
  function advance(n) {
    html = html.substring(n)
  }
  function parseStartTag() {
    // 匹配开始标签
    const start = html.match(startTagOpen)
    if (start) {
      // 定义match 存放标签名和属性
      const match = {
        tagName: start[1],
        attrs: []
      }
      // 截取掉匹配到的开始标签部分
      advance(start[0].length)
      let end, attr
      // 匹配属性，只要不是开始标签的结束部分，就一直匹配
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        // 截取掉匹配到的属性部分
        advance(attr[0].length)
        // 将属性添加到match下的attrs里
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5]
        })
      }
      // 如果有匹配到开始标签的结束部分，需要截取掉
      if (end) {
        advance(end[0].length)
      }
      return match
    }
    return false
  }
}
