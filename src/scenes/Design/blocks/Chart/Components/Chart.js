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

        let innerHTML = 'HERE BE CHART: '

        let chart = this.getChart()
        if (chart) {
          innerHTML += `${chart.name}`
        }

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

        this.el.innerHTML = innerHTML
        return this
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

      handleChangeID (event) {
        handleChangeID(this, event, WidgetType.CHART)
      },

      remove () {
        defaultType.view.prototype.remove.apply(this, arguments)

        const id = this.attr.id
        if (id) {
          configureStore().store.dispatch(editorWidgetRemove(id, WidgetType.CHART))
        }
      }

    })
  })
}
