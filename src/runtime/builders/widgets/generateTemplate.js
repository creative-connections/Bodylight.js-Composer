import toAST from 'to-ast'
import escodegen from 'escodegen'
import beautify from 'js-beautify'

export default object => {
  const ast = toAST(object)
  const code = escodegen.generate(ast)
  return beautify.js(code)
}
