import toAST from 'to-ast'
import escodegen from 'escodegen'
import beautify from 'js-beautify'
import Terser from 'terser'

import animate from './builders/widgets/Animate/build'
import action from './builders/widgets/Action/build'
import range from './builders/widgets/Range/build'
import button from './builders/widgets/Button/build'
import toggle from './builders/widgets/Toggle/build'
import css from './builders/widgets/Css/build'
import label from './builders/widgets/Label/build'
import animateAnim from './builders/widgets/AnimateAnim/build'
import animatePlay from './builders/widgets/AnimatePlay/build'
import animateText from './builders/widgets/AnimateText/build'
import chart from './builders/widgets/Chart/build'
import perf from './builders/widgets/Performance/build'
import spinner from './builders/widgets/Spinner/build'
import model from './builders/widgets/Model/build'
import widget from './builders/widgets/Widget/build'

import api from './builders/api/build'

import animateFps from './builders/application/animateFps/build'
import initAnimates from './builders/application/initAnimates/build'


import init from './templates/init'

import WidgetType from '@enum/WidgetType'
import ProviderType from '@enum/ProviderType'

import getEditorHtml from './builders/editor/html'
import getEditorCss from './builders/editor/css'

import initWidgets from './templates/initWidgets'
import initValueProviders from './templates/initValueProviders'
import resolveValueProviders from './templates/resolveValueProviders'


class Builder {
  constructor () {
    this.clearSrc()
  }

  buildImports () {
    return [
      widget(),
      action(),
      animate(),
      animateAnim(),
      animatePlay(),
      animateText(),
      button(),
      chart(),
      css(),
      label(),
      perf(this.exportPerformanceBlock),
      range(),
      spinner(),
      toggle(),
      model(),

      api(),

      animateFps(),
      initAnimates()
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
    this.imports.forEach(({ css }) => CSS = CSS + css)

    return beautify.css(`
      ${CSS}
      ${getEditorCss()}
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

      this.imports = this.buildImports()

      const append = this.append.bind(this)
      this.clearSrc()

      append(this.head())

      // append editor created html and css
      append(`<div id='spinner-blur'>`)
      append(getEditorHtml())
      append(`</div>`)

      append(`<style>${this.getCss()}</style>`)

      this.imports.forEach(({ html }) => append(html))

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


    // create config object
    append('const config = { widgets: {} }')

    // append enums for used types
    append(`const WidgetType = ${tpl(WidgetType)}`)
    append(`const ProviderType = ${tpl(ProviderType)}`)



    this.imports.forEach(({ script }) => append(script))

    append(tpl(initValueProviders))
    append(tpl(initWidgets))
    append(tpl(resolveValueProviders))

    append(tpl(init))

    // initialize everything
    append('init()')

    append('}')

    append(`document.addEventListener('DOMContentLoaded', bodylightJS())`)

    return js
  }
}

export default Builder
