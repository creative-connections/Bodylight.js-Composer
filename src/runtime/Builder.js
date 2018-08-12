import toAST from 'to-ast'
import escodegen from 'escodegen'

import createModelRuntime from './templates/createModelRuntime'
import AnimateRuntime from './templates/AnimateRuntime'
import createAnimateRuntime from './templates/createAnimateRuntime'

import init from './templates/init'

import configureStore from '@src/configureStore'
import { getAnimates } from '@reducers'

import cwrapFunctions from './templates/model/cwrapFunctions'
import consoleLogger from './templates/model/consoleLogger'
import gettersAndSetters from './templates/model/gettersAndSetters'
import lookupProvider from './templates/model/lookupProvider'
import lookupWidget from './templates/model/lookupWidget'
import bindProviders from './templates/model/bindProviders'
import bindWidgets from './templates/model/bindWidgets'
import registerGetId from './templates/model/registerGetId'
import modelInit from './templates/model/init'
import modelTick from './templates/model/modelTick'
import stageTick from './templates/model/stageTick'
import updateOutputValues from './templates/model/updateOutputValues'
import updateControlledAnimateAnim from './templates/model/updateControlledAnimateAnim'
import updateAnimateText from './templates/model/updateAnimateText'

import update from 'immutability-helper'

import WidgetType from '@helpers/WidgetType'
import ValueProviderType from '@helpers/ValueProviderType'
import ValueProviders from '@helpers/ValueProviders'
import AnimateAnimMode from '@helpers/AnimateAnimMode'

class Builder {
  constructor () {
    const {store} = configureStore()
    const state = store.getState()

    this.models = state.models
    this.configAnimateAnim = state.configAnimateAnim
    this.configAnimateText = state.configAnimateText
    this.animates = getAnimates(state)

    this.html = state.editorStorage.html
    this.css = state.editorStorage.css
    this.clearSrc()
  }

  getLookupProvider (model, provider) {
    let reference
    if (provider.type === ValueProviderType.MODEL_PARAMETER) {
      reference = model.parameters[provider.name].reference
    }
    if (provider.type === ValueProviderType.MODEL_VARIABLE) {
      reference = model.variables[provider.name].reference
    }
    console.log(provider)
    return Function(
      `return this.lookupProvider(
        '${provider.type}',
        ${reference}
      )`
    )
  }

  createConfigForModel (name) {
    const model = this.models[name]
    let config = {}
    config.interval = model.interval
    config.stepSize = parseFloat(model.stepSize)
    config.guid = model.guid
    config.identifier = model.modelIdentifier
    config.name = model.name

    config.widgets = {
      controlledAnimateAnim: [],
      AnimateText: []
    }

    this.attachedAnimations = []

    Object.entries(this.configAnimateAnim).forEach(([animate, widgets]) => {
      Object.entries(widgets).forEach(([name, configuration]) => {
        // check if the widget is handled by us
        let provider = ValueProviders.value(configuration.valueProvider)
        if (provider.parent !== model.name) {
          return
        }

        const transform = Function(`return ${configuration.transform}`)()
        const widget = Function(
          `return this.lookupWidget(
            '${WidgetType.ANIMATE_ANIM}',
            '${animate}',
            '${name}')`
        )
        const valueProvider = this.getLookupProvider(model, provider)

        configuration = update(configuration, {
          transform: {$set: transform},
          widget: {$set: widget},
          valueProvider: {$set: valueProvider}
        })

        if (configuration.mode === AnimateAnimMode.CONTROLLED) {
          config.widgets['controlledAnimateAnim'].push(configuration)
        }
      })
    })

    Object.entries(this.configAnimateText).forEach(([animate, widgets]) => {
      Object.entries(widgets).forEach(([name, configuration]) => {
        // check if the widget is handled by us
        let provider = ValueProviders.value(configuration.valueProvider)
        if (provider.parent !== model.name) {
          return
        }

        const transform = Function(`return ${configuration.transform}`)()
        const visible = Function(`return ${configuration.visible}`)()
        const widget = Function(
          `return this.lookupWidget(
            '${WidgetType.ANIMATE_TEXT}',
            '${animate}',
            '${name}')`
        )
        const valueProvider = this.getLookupProvider(model, provider)

        configuration = update(configuration, {
          transform: {$set: transform},
          visible: {$set: visible},
          widget: {$set: widget},
          valueProvider: {$set: valueProvider}
        })

        config.widgets['AnimateText'].push(configuration)
      })
    })

    return config
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

  /*
    Creates a modelDefinition object {modelName: Model}
  */
  appendModelDefinitions () {
    this.append('let modelDefinitions = {}')

    Object.keys(this.models).forEach(modelName => {
      const model = this.models[modelName]
      const name = model.name

      this.append(model.js)
      this.append(`modelDefinitions.${name} = ${name}`)
    })
  }

  /*
    Creates a modelConfig object {modelName: Config}
  */
  appendModelConfigs () {
    this.append('let modelConfigs = {}')

    Object.keys(this.models).forEach(modelName => {
      const config = this.tpl(this.createConfigForModel(modelName))

      console.log(config)
      this.append(`modelConfigs.${modelName} = ${config}`)
    })
  }

  appendAnimates () {
    this.append('let animates = {}')
    Object.entries(this.animates).forEach(([key, value]) => {
      // create function from sources
      let source = Function(' "use strict"; return(' + value.source + ')')
      // call source() to get the actual animate source function
      this.append(`animates.${key} = ${this.tpl(source())}`)
    })
  }

  appendFunctions () {
    this.append('let functions = {}')

    this.append('functions.cwrapFunctions = ' + this.tpl(cwrapFunctions))
    this.append('functions.consoleLogger = ' + this.tpl(consoleLogger))
    this.append('functions.gettersAndSetters = ' + this.tpl(gettersAndSetters))
    this.append('functions.lookupProvider = ' + this.tpl(lookupProvider))
    this.append('functions.lookupWidget = ' + this.tpl(lookupWidget))
    this.append('functions.bindProviders = ' + this.tpl(bindProviders))
    this.append('functions.bindWidgets = ' + this.tpl(bindWidgets))
    this.append('functions.registerGetId = ' + this.tpl(registerGetId))
    this.append('functions.init = ' + this.tpl(modelInit))
    this.append('functions.modelTick = ' + this.tpl(modelTick))
    this.append('functions.stageTick = ' + this.tpl(stageTick))
    this.append('functions.updateOutputValues = ' + this.tpl(updateOutputValues))
    this.append('functions.updateControlledAnimateAnim = ' + this.tpl(updateControlledAnimateAnim))
    this.append('functions.updateAnimateText = ' + this.tpl(updateAnimateText))
  }

  appendWidgetType () {
    this.append(`let WidgetType = ${this.tpl(WidgetType)}`)
  }

  appendValueProviderType () {
    this.append(`let ValueProviderType = ${this.tpl(ValueProviderType)}`)
  }

  build () {
    const append = this.append.bind(this)
    const tpl = this.tpl.bind(this)

    this.clearSrc()

    append(this.html)
    append(`<style>${this.css}</style>`)

    append('<script src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>')

    append('<script>')

    // wrap our context in a init function so that we don't namespace collide
    append('const bodylightJS = () => {')

    this.appendModelDefinitions()
    this.appendModelConfigs()
    this.appendFunctions()
    this.appendWidgetType()
    this.appendValueProviderType()
    this.appendAnimates()

    append(tpl(AnimateRuntime))

    append(tpl(createModelRuntime))
    append(tpl(createAnimateRuntime))

    append(tpl(init))

    append(`
      init(
        modelDefinitions,
        modelConfigs,
        animates,
        functions,
        WidgetType,
        ValueProviderType
      )
    `)

    append('}')

    append(`document.addEventListener('DOMContentLoaded', bodylightJS())`)
    append('</script>')

    return this.src
  }
}

export default Builder
