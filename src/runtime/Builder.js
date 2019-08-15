import toAST from 'to-ast'
import escodegen from 'escodegen'
import beautify from 'js-beautify'

import range from './builders/widgets/Range/build'
import button from './builders/widgets/Button/build'
import toggle from './builders/widgets/Toggle/build'
import animateText from './builders/widgets/AnimateText/build'
import css from './builders/widgets/Css/build'
import label from './builders/widgets/Label/build'
import perf from './builders/widgets/Performance/build'
import animateAnim from './builders/widgets/AnimateAnim/build'

import createModelRuntime from './templates/createModelRuntime'
import AnimateRuntime from './AnimateRuntime'
import createAnimateRuntime from './templates/createAnimateRuntime'

import init from './templates/init'

import cwrapFunctions from './templates/model/cwrapFunctions'
import consoleLogger from './templates/model/consoleLogger'
import gettersAndSetters from './templates/model/gettersAndSetters'
import modelInit from './templates/model/init'
import modelTick from './templates/model/continuous/modelTick'
import stageTick from './templates/model/continuous/stageTick'
import OutputValues from './templates/model/OutputValues'
import registerValueListener from './templates/model/registerValueListener'
import registerArrayListener from './templates/model/registerArrayListener'
import registerInitialValueListener from './templates/model/registerInitialValueListener'
import registerValueSetter from './templates/model/registerValueSetter'
import disableListener from './templates/model/disableListener'
import enableListener from './templates/model/enableListener'
import updateInitialValueListeners from './templates/model/updateInitialValueListeners'
import getReferenceFromName from './templates/model/getReferenceFromName'
import setInitialValues from './templates/model/setInitialValues'
import setInitialValueByName from './templates/model/setInitialValueByName'
import updateValueByName from './templates/model/updateValueByName'
import getValueByName from './templates/model/getValueByName'
import setSpeed from './templates/model/api/setSpeed'

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

import WidgetType from '@enum/WidgetType'
import ProviderType from '@enum/ProviderType'

import buildChartConfig from './builders/widgets/Chart/config'

import appendModels from './builders/widgets/Model/models'
import buildModelConfig from './builders/widgets/Model/config'

import buildActionConfig from './builders/widgets/Action/config'

import appendAnimates from './builders/widgets/Animate/animates'

import getEditorHtml from './builders/editor/html'
import getEditorCss from './builders/editor/css'

import initAnimates from './templates/initAnimates'
import initWidgets from './templates/initWidgets'
import initValueProviders from './templates/initValueProviders'
import resolveValueProviders from './templates/resolveValueProviders'

import Widget from './templates/widget/Widget'


import PlotlyBase from './templates/widget/Chart/PlotlyBase'
import PlotlyChart from './templates/widget/Chart/PlotlyChart'
import Gamblegram from './templates/widget/Chart/Gamblegram'
import initCharts from './templates/widget/Chart/init'

import initAnimatePlays from './templates/widget/AnimatePlay/init'

import animateFps from './builders/application/animateFps'

import SpinnerHtml from './templates/widget/Spinner/html'
import SpinnerCss from './templates/widget/Spinner/css'
import Spinner from './templates/widget/Spinner'

import Terser from 'terser'

// API
import appendAPI from './templates/api'

class Builder {
  constructor () {
    this.clearSrc()

  }

  buildWidgets () {
    return [
      range(),
      button(),
      toggle(),
      animateText(),
      animateAnim(),
      css(),
      label(),
      perf(this.exportPerformanceBlock)
    ]
  }

  setMinify(minify = false) {
    this.buildMinified = minify
  }

  setExportPerformanceBlock (exportPerformanceBlock = false) {
    this.exportPerformanceBlock = exportPerformanceBlock
  }

  setBundleDependencies (bundleDependencies = false) {
    this.bundleDependencies = bundleDependencies
  }

  clearSrc() {
    this.src = ''
  }

  append(code) {
    this.src = this.src + '\n' + code
  }

  tpl(template) {
    const ast = toAST(template)
    return escodegen.generate(ast)
  }

  appendFunctions(append, tpl) {
    append('functions.cwrapFunctions = ' + tpl(cwrapFunctions))
    append('functions.consoleLogger = ' + tpl(consoleLogger))
    append('functions.gettersAndSetters = ' + tpl(gettersAndSetters))
    append('functions.init = ' + tpl(modelInit))
    append('functions.instantiate = ' + tpl(instantiate))
    append('functions.setup = ' + tpl(setup))
    append('functions.reset = ' + tpl(reset))
    append('functions.registerValueListener = ' + tpl(registerValueListener))
    append('functions.registerArrayListener = ' + tpl(registerArrayListener))
    append('functions.registerInitialValueListener = ' + tpl(registerInitialValueListener))
    append('functions.disableListener = ' + tpl(disableListener))
    append('functions.enableListener = ' + tpl(enableListener))
    append('functions.updateInitialValueListeners = ' + tpl(updateInitialValueListeners))
    append('functions.registerValueSetter = ' + tpl(registerValueSetter))
    append('functions.getReferenceFromName = ' + tpl(getReferenceFromName))
    append('functions.setInitialValues = ' + tpl(setInitialValues))
    append('functions.setInitialValueByName = ' + tpl(setInitialValueByName))
    append('functions.updateValueByName = ' + tpl(updateValueByName))
    append('functions.getValueByName = ' + tpl(getValueByName))
    append('functions.OutputValues = ' + tpl(OutputValues))
    append('functions.setSpeed = ' + tpl(setSpeed))

    append('functions.continuous = {}')
    append('functions.continuous.play = ' + tpl(continuousPlay))
    append('functions.continuous.pause = ' + tpl(continuousPause))
    append('functions.continuous.setValue = ' + tpl(continuousSetValue))
    append('functions.continuous.modelTick = ' + tpl(modelTick))
    append('functions.continuous.stageTick = ' + tpl(stageTick))
    append('functions.continuous.updateValueListeners = ' + tpl(continuousUpdateValueListeners))

    append('functions.oneshot = {}')
    append('functions.oneshot.play = ' + tpl(oneshotPlay))
    append('functions.oneshot.pause = ' + tpl(oneshotPause))
    append('functions.oneshot.setValue = ' + tpl(oneshotSetValue))
    append('functions.oneshot.updateValueListeners = ' + tpl(oneshotUpdateValueListeners))
  }

  minify(js) {
    const options = {
      compress: {
        ecma: 8,
        passes: 2
      },
      warnings: false,
      ecma: 8
    }
    const result = Terser.minify(js, options)
    if (result.warnings) {
      console.warn(`Minify warning for: ${js}`)
      console.warn(result.warnings)
    }
    if (result.error) {
      console.error(`Minify failed for: ${js}`)
      console.error(result.error)
      throw result.error
    }
    return result.code
  }

  getCss() {
    let CSS = ''
    this.widgets.forEach(({ css }) => CSS = CSS + css)

    return beautify.css(`
      ${CSS}
      ${getEditorCss()}
      ${SpinnerCss()}
    `)
  }

  head() {
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"></head>`
  }

  tail() {
    return `</html>`
  }

  fetchDependency(url) {
    return new Promise(resolve => {
      fetch(url, {mode: 'cors'}).then(response => {
        resolve(response.text())
      })
    }).catch(error => {
      console.log('There has been a problem with your fetch operation: ', error.message)
    })
  }

  getDependencies() {
    if (this.bundleDependencies) {
      return new Promise(resolve => {
        Promise.all([
          this.fetchDependency('lib/createjs-2015.11.26.min.js'),
          this.fetchDependency('lib/plotly.min.js'),
        ]).then(results => {
          resolve(`<script>${results.join(' ')}</script>`)
        })
      })
    } else {
      return new Promise(resolve => {
        let html = ''
        html += '<script src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>'
        html += '<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>'
        resolve(html)
      })
    }
  }

  build() {
    return new Promise((resolve, reject) => {

      this.widgets = this.buildWidgets()

      const append = this.append.bind(this)
      this.clearSrc()

      append(this.head())

      append(SpinnerHtml())

      // append editor created html and css
      append(`<div id='spinner-blur'>`)
      append(getEditorHtml())
      append(`</div>`)

      append(`<style>${this.getCss()}</style>`)

      this.widgets.forEach(({ html }) => append(html))

      this.getDependencies().then(dependencies => {
        append(dependencies)

        let js = this.buildJS()
        if (this.buildMinified) {
          js = this.minify(js)
        }

        append('<script>')
        append(js)
        append('</script>')

        append(this.tail())

        resolve(this.src)
      })
    })
  }

  buildJS() {
    let js = ''

    const append = code => {
      js = js + '\n' + code
    }
    const tpl = this.tpl.bind(this)

    // wrap our context in a init function so that we don't namespace collide
    append('const bodylightJS = () => {')

    append('const widgets = []')

    // create model runtime definitions in models
    append('const models = {}')
    appendModels(append, tpl)

    // create animate runtime definitions in animates
    append('const animates = {}')
    appendAnimates(append, tpl)

    append(tpl(Spinner))
    append(`const spinner = new Spinner()`)

    // create config object
    append('const config = {}')
    append(`config.models = ${tpl(buildModelConfig())}`)

    append(`config.actions = ${tpl(buildActionConfig())}`)

    append('config.widgets = {}')
    append(`config.widgets.charts = ${tpl(buildChartConfig())}`)


    /*
     * create model functions
     * TODO: refactor to config.models[model].functions with overrides
     */
    append('const functions = {}')
    this.appendFunctions(append, tpl)

    // append enums for used types
    append(`const WidgetType = ${tpl(WidgetType)}`)
    append(`const ProviderType = ${tpl(ProviderType)}`)

    append(`const animateFps = ${animateFps()}`)

    // append class AnimateRuntime
    append(tpl(AnimateRuntime))

    // append widget classes
    append(tpl(Widget))

    this.widgets.forEach(({ script }) => append(script))



    append(tpl(initAnimatePlays))


    append(tpl(PlotlyBase))
    append(tpl(PlotlyChart))
    append(tpl(Gamblegram))
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

    return js
  }
}

export default Builder
