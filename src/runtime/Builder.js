import toAST from 'to-ast'
import escodegen from 'escodegen'

import modelRuntime from './templates/modelRuntime'
import init from './templates/init'

class Builder {
  constructor (
    models
  ) {
    this.models = models

    console.log(escodegen.generate(toAST({})))

    this.clearSrc()
  }

  clearSrc () {
    this.src = ''
  }

  append (code) {
  }

  build () {
    this.clearSrc()

    const append = (code) => {
      this.src = this.src + '\n' + code
    }
    const tpl = (template) => {
      const ast = toAST(template)
      return escodegen.generate(ast)
    }

    append('<script>{')

    append(tpl(modelRuntime))

    append('var models = {}')

    Object.keys(this.models).forEach(modelname => {
      const model = this.models[modelname]
      const name = model.name

      append(model.js)
      append(`models.${name} = ${name}`)
    })

    append(tpl(init))

    append(`document.addEventListener('DOMContentLoaded', () => {init()}, false)`)

    append('}</script>')

    return this.src
  }
}

export default Builder
