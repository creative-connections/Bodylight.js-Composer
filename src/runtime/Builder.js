import toAST from 'to-ast'
import escodegen from 'escodegen'

import createModelRuntime from './templates/createModelRuntime'
import AnimateRuntime from './templates/AnimateRuntime'
import createAnimateRuntime from './templates/createAnimateRuntime'

import init from './templates/init'

import cwrapFunctions from './templates/model/cwrapFunctions'
import consoleLogger from './templates/model/consoleLogger'
import gettersAndSetters from './templates/model/gettersAndSetters'
import modelInit from './templates/model/init'
import modelTick from './templates/model/modelTick'
import stageTick from './templates/model/stageTick'
import updateOutputValues from './templates/model/updateOutputValues'
import registerValueListener from './templates/model/registerValueListener'
import registerInitialValueListener from './templates/model/registerInitialValueListener'
import registerValueSetter from './templates/model/registerValueSetter'
import updateValueListeners from './templates/model/updateValueListeners'
import updateInitialValueListeners from './templates/model/updateInitialValueListeners'
import setValue from './templates/model/setValue'
import getReferenceFromName from './templates/model/getReferenceFromName'
import play from './templates/model/play'
import pause from './templates/model/pause'

import WidgetType from '@helpers/enum/WidgetType'
import ValueProviderType from '@helpers/ValueProviderType'

import buildAnimateAnimConfig from './builders/widgets/AnimateAnim/config'
import buildAnimateTextConfig from './builders/widgets/AnimateText/config'
import buildRangeConfig from './builders/widgets/Range/config'
import buildButtonConfig from './builders/widgets/Button/config'

import appendModels from './builders/widgets/models/models'
import buildModelConfig from './builders/widgets/models/config'

import buildActionConfig from './builders/actions/config'

import appendAnimates from './builders/animates/animates'

import getEditorHtml from './builders/editor/html'
import getEditorCss from './builders/editor/css'

import initAnimates from './templates/initAnimates'
import initWidgets from './templates/initWidgets'
import initValueProviders from './templates/initValueProviders'
import resolveValueProviders from './templates/resolveValueProviders'

import Widget from './templates/widget/Widget'

import AnimateAnimControlled from './templates/widget/AnimateAnimControlled'
import AnimateText from './templates/widget/AnimateText'
import Range from './templates/widget/Range'
import Button from './templates/widget/Button'

import initAnimateAnimsControlled from './templates/widget/AnimateAnimControlled/init'
import initAnimateTexts from './templates/widget/AnimateText/init'
import initRanges from './templates/widget/Range/init'
import initButtons from './templates/widget/Button/init'

// API
import getModel from './templates/api/getModel'

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
    this.append('functions.init = ' + this.tpl(modelInit))
    this.append('functions.modelTick = ' + this.tpl(modelTick))
    this.append('functions.stageTick = ' + this.tpl(stageTick))
    this.append('functions.updateOutputValues = ' + this.tpl(updateOutputValues))
    this.append('functions.registerValueListener = ' + this.tpl(registerValueListener))
    this.append('functions.registerInitialValueListener = ' + this.tpl(registerInitialValueListener))
    this.append('functions.updateValueListeners = ' + this.tpl(updateValueListeners))
    this.append('functions.updateInitialValueListeners = ' + this.tpl(updateInitialValueListeners))
    this.append('functions.registerValueSetter = ' + this.tpl(registerValueSetter))
    this.append('functions.getReferenceFromName = ' + this.tpl(getReferenceFromName))
    this.append('functions.setValue = ' + this.tpl(setValue))
    this.append('functions.play = ' + this.tpl(play))
    this.append('functions.pause = ' + this.tpl(pause))
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

    append('const widgets = []')

    // create model runtime definitions in models
    append('const models = {}')
    appendModels(append, tpl)

    // create animate runtime definitions in animates
    append('const animates = {}')
    appendAnimates(append, tpl)

    // create config object
    append('const config = {}')
    append(`config.models = ${tpl(buildModelConfig())}`)

    append(`config.actions = ${tpl(buildActionConfig())}`)

    append('config.widgets = {}')
    append(`config.widgets.animateAnims = ${tpl(buildAnimateAnimConfig())}`)
    append(`config.widgets.animateTexts = ${tpl(buildAnimateTextConfig())}`)
    append(`config.widgets.ranges = ${tpl(buildRangeConfig())}`)
    append(`config.widgets.buttons = ${tpl(buildButtonConfig())}`)

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
    append(tpl(Widget))

    append(tpl(AnimateAnimControlled))
    append(tpl(initAnimateAnimsControlled))

    append(tpl(AnimateText))
    append(tpl(initAnimateTexts))

    append(tpl(Range))
    append(tpl(initRanges))

    append(tpl(Button))
    append(tpl(initButtons))

    append(tpl(createModelRuntime))
    append(tpl(createAnimateRuntime))

    append(tpl(initValueProviders))
    append(tpl(initWidgets))
    append(tpl(initAnimates))
    append(tpl(resolveValueProviders))

    append(tpl(init))

    // API
    append(tpl(getModel))

    // initialize everything
    append('init()')

    append('}')

    append(`document.addEventListener('DOMContentLoaded', bodylightJS())`)
    append('</script>')

    return this.src
  }
}

export default Builder
