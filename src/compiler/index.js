import { parseHTML } from './html-parser'
import { generate } from './codegen/index'
export const compileToFunctions = (template) => {
  const ast = parseHTML(template)
  generate(ast)
}
