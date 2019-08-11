import escodegen from 'escodegen'
import beautify from 'js-beautify'

const acorn = require('acorn')
class Parser {
  static parse (code, language) {
    if (language === 'javascript') {
      const ast = acorn.parse(code)
      const generated = escodegen.generate(ast)
      return generated
    }

    if (language === 'css') {
      return beautify.css(code)
    }

    return code
  }
}

export default Parser
