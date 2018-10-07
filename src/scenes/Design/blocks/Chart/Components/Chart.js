import { CHART, CHART_ID } from '../types.js'
import { configGetChart } from '@reducers'
import { addChart, removeChart } from '@actions'
import {
  handleChangeID,
  init,
  handleOnDrop,
  handleComponentRemove,
  getWidget,
  destroy,
  handleClick
} from '../../commons/Components'
import configureStore from '@src/configureStore'
import WidgetType from '@helpers/enum/WidgetType'
import update from 'immutability-helper'

export default (editor) => {
  const components = editor.DomComponents
  const defaultType = components.getType('default')
  const defaultModel = defaultType.model

  components.addType(CHART, {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        draggable: '*',
        droppable: false,
        tagName: 'div',
        attributes: {},
        classes: [],
        traits: [{
          type: CHART_ID,
          label: 'Chart widget',
          name: 'id'
        }],
        resizable: true
      })
    }, {
      isComponent: (el) => {
        if (el.tagName === 'CHART') {
          return {type: CHART}
        }
      }
    }),
    view: defaultType.view.extend({
      events: {
        changeID: 'handleChangeID',
        click: 'handleClick'
      },

      init () {
        init.bind(this)(editor)
      },

      handleComponentRemove (model) {
        handleComponentRemove.bind(this)(model)
      },

      handleOnDrop () {
        handleOnDrop.bind(this)(configGetChart, addChart)
      },

      render: function () {
        defaultType.view.prototype.render.apply(this, arguments)

        let chart = this.getWidget()

        let style = this.model.get('style')

        if (style.width === undefined) {
          style = update(style, {width: {$set: '100%'}})
          this.el.style.width = '100%'
          this.model.set('style', style)
        }
        if (style.height === undefined) {
          style = update(style, {height: {$set: '100%'}})
          this.el.style.height = '100%'
          this.model.set('style', style)
        }

        this.initPlotly = this.initPlotly.bind(this)

        if (chart) {
          this.initPlotly()
        } else {
          this.el.innerHTML = 'Select chart'
        }

        this.handleUpdate = this.handleUpdate.bind(this)
        this.registerUpdateHandler()

        return this
      },

      handleUpdate (e) {
        const el = this.el
        if (!this.el) {
          return
        }
        // check if we need to resize
        if (this.prevW !== el.style.width || this.prevH !== el.style.height) {
          this.prevW = el.style.width
          this.prevH = el.style.height

          if (this.plotly) {
            Plotly.Plots.resize(this.plotly)
          }
        }
      },

      /**
       * Registers event listeners for component update.
       */
      registerUpdateHandler () {
        this.prevW = null
        this.prevH = null
        editor.on('component:styleUpdate', this.handleUpdate)
        editor.on('component:update', this.handleUpdate)
        editor.on('load', this.handleUpdate)

        this.handlersRegistered = true
      },

      deregisterUpdateHandler () {
        if (this.handlersRegistered !== true) {
          return
        }

        editor.off('component:styleUpdate', this.handleUpdate)
        editor.off('component:update', this.handleUpdate)
        editor.off('load', this.handleUpdate)

        this.handlersRegistered = false
      },

      getWidget () {
        return getWidget.bind(this)(configGetChart)
      },

      handleClick () {
        handleClick(this.getWidget(), editor)
      },

      initPlotly () {
        const chart = this.getWidget()
        if (this.chartId === chart.id) {
          return
        }
        this.chartId = chart.id
        this.el.style.overflow = 'hidden'
        this.plotly = Plotly.d3.select(this.el).node()

        const data = [{ x: [], y: [], mode: 'lines', type: 'scatter' }]
        const layout = {
          xaxis: chart.xaxis,
          yaxis: chart.yaxis,
          margin: { l: 50, r: 20, b: 20, t: 20, pad: 4 }
        }
        const config = {
          displayModeBar: false,
          staticPlot: true
        }

        Plotly.newPlot(this.plotly, data, layout, config)
        window.setTimeout(() => {
          Plotly.Plots.resize(this.plotly)
        }, 100)
      },

      handleChangeID (event) {
        handleChangeID(this, event, WidgetType.CHART)
      },

      destroy () {
        destroy.bind(this)(removeChart)
      },

      remove () {
        defaultType.view.prototype.remove.apply(this, arguments)
        this.deregisterUpdateHandler()
      }

    })
  })
}
