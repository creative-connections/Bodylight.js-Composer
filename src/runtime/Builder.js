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
import modelTick from './templates/model/continuous/modelTick'
import stageTick from './templates/model/continuous/stageTick'
import updateOutputValues from './templates/model/updateOutputValues'
import registerValueListener from './templates/model/registerValueListener'
import registerInitialValueListener from './templates/model/registerInitialValueListener'
import registerValueSetter from './templates/model/registerValueSetter'
import updateInitialValueListeners from './templates/model/updateInitialValueListeners'
import getReferenceFromName from './templates/model/getReferenceFromName'
import setInitialValues from './templates/model/setInitialValues'
import setInitialValueByName from './templates/model/setInitialValueByName'

import instantiate from './templates/model/instantiate'
import setup from './templates/model/setup'
import reset from './templates/model/reset'

import continuousPlay from './templates/model/continuous/play'
import continuousPause from './templates/model/continuous/pause'
import continuousSetValue from './templates/model/continuous/setValue'
import continuousUpdateValueListeners from './templates/model/continuous/updateValueListeners'
import oneshotPlay from './templates/model/oneshot/play'
import oneshotPause from './templates/model/oneshot/pause'
import oneshotSetValue from './templates/model/oneshot/setValue'
import oneshotUpdateValueListeners from './templates/model/oneshot/updateValueListeners'

import WidgetType from '@helpers/enum/WidgetType'
import ProviderType from '@helpers/enum/ProviderType'

import buildAnimateAnimConfig from './builders/widgets/AnimateAnim/config'
import buildAnimateTextConfig from './builders/widgets/AnimateText/config'
import buildRangeConfig from './builders/widgets/Range/config'
import buildButtonConfig from './builders/widgets/Button/config'
import buildToggleConfig from './builders/widgets/Toggle/config'
import buildChartConfig from './builders/widgets/Chart/config'

import appendModels from './builders/widgets/models/models'
import buildModelConfig from './builders/widgets/models/config'

import buildActionConfig from './builders/widgets/Action/config'

import appendAnimates from './builders/widgets/animates/animates'

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

import PlotlyChart from './templates/widget/Chart/PlotlyChart'
import initCharts from './templates/widget/Chart/init'

import Button from './templates/widget/Button'
import Toggle from './templates/widget/Toggle'
import initAnimateAnimsControlled from './templates/widget/AnimateAnimControlled/init'
import initAnimateTexts from './templates/widget/AnimateText/init'
import initRanges from './templates/widget/Range/init'
import initButtons from './templates/widget/Button/init'
import initToggles from './templates/widget/Toggle/init'

// API
import appendAPI from './templates/api'

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
    this.append('functions.instantiate = ' + this.tpl(instantiate))
    this.append('functions.setup = ' + this.tpl(setup))
    this.append('functions.reset = ' + this.tpl(reset))
    this.append('functions.updateOutputValues = ' + this.tpl(updateOutputValues))
    this.append('functions.registerValueListener = ' + this.tpl(registerValueListener))
    this.append('functions.registerInitialValueListener = ' + this.tpl(registerInitialValueListener))
    this.append('functions.updateInitialValueListeners = ' + this.tpl(updateInitialValueListeners))
    this.append('functions.registerValueSetter = ' + this.tpl(registerValueSetter))
    this.append('functions.getReferenceFromName = ' + this.tpl(getReferenceFromName))
    this.append('functions.setInitialValues = ' + this.tpl(setInitialValues))
    this.append('functions.setInitialValueByName = ' + this.tpl(setInitialValueByName))

    this.append('functions.continuous = {}')
    this.append('functions.continuous.play = ' + this.tpl(continuousPlay))
    this.append('functions.continuous.pause = ' + this.tpl(continuousPause))
    this.append('functions.continuous.setValue = ' + this.tpl(continuousSetValue))
    this.append('functions.continuous.modelTick = ' + this.tpl(modelTick))
    this.append('functions.continuous.stageTick = ' + this.tpl(stageTick))
    this.append('functions.continuous.updateValueListeners = ' + this.tpl(continuousUpdateValueListeners))

    this.append('functions.oneshot = {}')
    this.append('functions.oneshot.play = ' + this.tpl(oneshotPlay))
    this.append('functions.oneshot.pause = ' + this.tpl(oneshotPause))
    this.append('functions.oneshot.setValue = ' + this.tpl(oneshotSetValue))
    this.append('functions.oneshot.updateValueListeners = ' + this.tpl(oneshotUpdateValueListeners))
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
    append('<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>')
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
    append(`config.widgets.toggles = ${tpl(buildToggleConfig())}`)
    append(`config.widgets.charts = ${tpl(buildChartConfig())}`)

    // create model functions
    // TODO: refactor to config.models[model].functions with overrides
    append('const functions = {}')
    this.appendFunctions()

    // append enums for used types
    append(`const WidgetType = ${tpl(WidgetType)}`)
    append(`const ProviderType = ${tpl(ProviderType)}`)

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

    append(tpl(Toggle))
    append(tpl(initToggles))

    append(tpl(PlotlyChart))
    append(tpl(initCharts))

    append(tpl(createModelRuntime))
    append(tpl(createAnimateRuntime))

    append(tpl(initValueProviders))
    append(tpl(initWidgets))
    append(tpl(initAnimates))
    append(tpl(resolveValueProviders))

    append(tpl(init))

    // API
    appendAPI(append, tpl)

    // initialize everything
    append('init()')

    append('}')

    append(`document.addEventListener('DOMContentLoaded', bodylightJS())`)
    append('</script>')

    return this.src
  }
}

export default Builder
