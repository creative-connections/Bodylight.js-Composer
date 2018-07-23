import toAST from 'to-ast'
import escodegen from 'escodegen'

import modelRuntime from './templates/modelRuntime'
import init from './templates/init'

class Builder {
  constructor (
    models
  ) {
    this.models = models
    this.clearSrc()
  }

  clearSrc () {
    this.src = ''
  }

  append (code) {
    this.src = this.src + '\n' + code
  }

  tpl (template) {
    const ast = toAST(template)
    return escodegen.generate(ast)
  }

  appendModelDefinitions () {
    this.append('let modelDefinitions = {}')

    Object.keys(this.models).forEach(modelname => {
      const model = this.models[modelname]
      const name = model.name

      this.append(model.js)
      this.append(`modelDefinitions.${name} = ${name}`)
    })
  }

  build () {
    const append = this.append.bind(this)
    const tpl = this.tpl.bind(this)

    this.clearSrc()

    append('<script>{')

    // creates variable modelDefinitions={name: model}
    this.appendModelDefinitions()

    append(tpl(modelRuntime))

    append(tpl(init))

    append(`document.addEventListener('DOMContentLoaded', () => {
      init(modelDefinitions)
    }, false)`)

    append('}</script>')

    return this.src
  }
}

export default Builder
