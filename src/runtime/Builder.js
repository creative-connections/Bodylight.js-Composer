import toAST from 'to-ast'
import escodegen from 'escodegen'

import createModelRuntime from './templates/createModelRuntime'
import AnimateRuntime from './templates/AnimateRuntime'
import createAnimateRuntime from './templates/createAnimateRuntime'

import init from './templates/init'

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

import WidgetType from '@helpers/WidgetType'
import ValueProviderType from '@helpers/ValueProviderType'
import ValueProviders from '@helpers/ValueProviders'
import AnimateAnimMode from '@helpers/AnimateAnimMode'

import buildAnimateAnimConfig from './builders/widgets/AnimateAnim/config'
import buildAnimateTextConfig from './builders/widgets/AnimateText/config'
import buildRangeConfig from './builders/widgets/Range/config'

import appendModels from './builders/models/models'
import buildModelConfig from './builders/models/config'

import appendAnimates from './builders/animates/animates'

import getEditorHtml from './builders/editor/html'
import getEditorCss from './builders/editor/css'

import initAnimates from './templates/initAnimates'
import initWidgets from './templates/initWidgets'
import initValueProviders from './templates/initValueProviders'
import resolveValueProviders from './templates/resolveValueProviders'

import AnimateAnim from './templates/widget/AnimateAnim'
import AnimateText from './templates/widget/AnimateText'

class Builder {
  constructor () {
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

  appendFunctions () {
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

  build () {
    const append = this.append.bind(this)
    const tpl = this.tpl.bind(this)

    this.clearSrc()

    // append editor created html and css
    append(getEditorHtml())
    append(`<style>${getEditorCss()}</style>`)

    // CreateJS for AnimateRuntime
    append('<script src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>')
    append('<script>')

    // wrap our context in a init function so that we don't namespace collide
    append('const bodylightJS = () => {')

    append('const widgets = {}')

    // create model runtime definitions in models
    append('const models = {}')
    appendModels(append, tpl)

    // create animate runtime definitions in animates
    append('const animates = {}')
    appendAnimates(append, tpl)

    // create config object
    append('const config = {}')
    append(`config.models = ${tpl(buildModelConfig())}`)

    append('config.widgets = {}')
    append(`config.widgets.animateAnims = ${tpl(buildAnimateAnimConfig())}`)
    append(`config.widgets.animateTexts = ${tpl(buildAnimateTextConfig())}`)
    append(`config.widgets.ranges = ${tpl(buildRangeConfig())}`)

    // create model functions
    // TODO: refactor to config.models[model].functions with overrides
    append('const functions = {}')
    this.appendFunctions()

    // append enums for used types
    append(`const WidgetType = ${tpl(WidgetType)}`)
    append(`const ValueProviderType = ${tpl(ValueProviderType)}`)

    // append class AnimateRuntime
    append(tpl(AnimateRuntime))

    // append widget classes
    append(tpl(AnimateAnim))
    append(tpl(AnimateText))

    append(tpl(createModelRuntime))
    append(tpl(createAnimateRuntime))

    append(tpl(initValueProviders))
    append(tpl(initWidgets))
    append(tpl(initAnimates))
    append(tpl(resolveValueProviders))

    append(tpl(init))

    // initialize everything
    append('init()')

    append('}')

    append(`document.addEventListener('DOMContentLoaded', bodylightJS())`)
    append('</script>')

    return this.src
  }
}

export default Builder
