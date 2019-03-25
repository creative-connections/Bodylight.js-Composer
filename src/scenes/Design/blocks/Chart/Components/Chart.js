import { CHART, CHART_ID } from '../types.js'
import { configGetChart } from '@reducers'
import { addChart, removeChart } from '@actions'
import {
  handleChangeID,
  init,
  handleOnDrop,
  getWidget,
  destroy,
  handleClick
} from '../../commons/Components'
import WidgetType from '@helpers/enum/WidgetType'

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
        style: {
          'min-height': '50px',
        },
        resizable: true
      }),
    }),
    view: defaultType.view.extend({
      events: {
        changeID: 'handleChangeID',
        click: 'handleClick'
      },

      init() {
        init.bind(this)(editor)
      },

      handleOnDrop() {
        handleOnDrop.bind(this)(configGetChart, addChart)
      },

      render() {
        defaultType.view.prototype.render.apply(this, arguments)
        // TEMP FIXME: add a proper placeholder
        this.el.innerHTML = 'Chart'
        this.el.style['text-align'] = 'center'
        return this
      },

      getWidget() {
        return getWidget.bind(this)(configGetChart)
      },

      handleClick() {
        handleClick(this.getWidget(), editor)
      },

      handleChangeID(event) {
        handleChangeID(this, event, WidgetType.CHART)
      },

      destroy() {
        destroy.bind(this)(removeChart)
      },

      remove() {
        defaultType.view.prototype.remove.apply(this, arguments)
      }
    })
  })
}
