import { CHART, CHART_ID } from '../types.js'
import { configGetChart } from '@reducers'
import { editorWidgetRemove } from '@actions'
import { handleChangeID } from '../../commons/Components'
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

      render: function () {
        defaultType.view.prototype.render.apply(this, arguments)

        let chart = this.getChart()

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

      /**
       * Loads chart configuration from Redux state.
       * @return {chart configuration}
       */
      getChart () {
        const id = this.attr.id
        if (typeof id === 'undefined' || id === null || id === '') {
          return null
        }
        return configGetChart(configureStore().store.getState(), id)
      },

      handleClick () {
        // We want to open component settings when CHART_ID is unset
        if (this.getChart() === null) {
          editor.Panels.getButton('views', 'open-tm').set('active', true)
        }
      },

      initPlotly () {
        const chart = this.getChart()
        if (this.chartId === chart.id) {
          // return
        }
        this.chartId = chart.id

        const d3 = Plotly.d3
        const div = d3.select(this.el).append('div').style(
          { width: '100%', height: '100%' }
        )

        this.plotly = div.node()
        const data = []
        const shapes = []
        const layout = {
          xaxis: chart.xaxis,
          yaxis: chart.yaxis,
          margin: { l: 50, r: 20, b: 20, t: 20, pad: 4 },
          shapes: shapes
        }
        const config = {
          'displayModeBar': false
        }

        Plotly.newPlot(this.plotly, data, layout, config)
        window.setTimeout(() => {
          Plotly.Plots.resize(this.plotly)
        }, 100)
      },

      handleChangeID (event) {
        handleChangeID(this, event, WidgetType.CHART)
      },

      remove () {
        defaultType.view.prototype.remove.apply(this, arguments)

        this.deregisterUpdateHandler()

        const id = this.attr.id
        if (id) {
          configureStore().store.dispatch(editorWidgetRemove(id, WidgetType.CHART))
        }
      }

    })
  })
}
