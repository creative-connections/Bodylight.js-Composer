import escodegen from 'escodegen'

const acorn = require('acorn')

class Parser {
  static parse (code) {
    const ast = acorn.parse(code)
    const generated = escodegen.generate(ast)
    return generated
  }
}

export default Parser
