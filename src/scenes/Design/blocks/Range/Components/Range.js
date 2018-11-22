import { RANGE, RANGE_ID } from '../types.js'
import { configGetRange } from '@reducers'
import { addRange, removeRange } from '@actions'
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

  components.addType(RANGE, {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        draggable: '*',
        droppable: false,
        tagName: 'input',
        attributes: { type: 'range' },
        classes: [],
        traits: [{
          type: RANGE_ID,
          label: 'Range',
          name: 'id'
        }],
        resizable: true
      })
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
        handleOnDrop.bind(this)(configGetRange, addRange)
      },

      getWidget() {
        return getWidget.bind(this)(configGetRange)
      },

      handleChangeID(event) {
        handleChangeID(this, event, WidgetType.RANGE)
      },

      destroy() {
        destroy.bind(this)(removeRange)
      },

      handleClick() {
        handleClick(this.getWidget(), editor)
      }
    })
  })
}