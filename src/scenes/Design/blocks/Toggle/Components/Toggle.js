import { TOGGLE, TOGGLE_ID } from '../types.js'
import { configGetToggle } from '@reducers'
import { addToggle, removeToggle } from '@actions'
import {
  handleChangeID,
  init,
  handleOnDrop,
  getWidget,
  destroy,
  handleClick
} from '../../commons/Components'
import WidgetType from '@enum/WidgetType'

export default (editor) => {
  const components = editor.DomComponents
  const defaultType = components.getType('default')
  const defaultModel = defaultType.model

  components.addType(TOGGLE, {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        draggable: '*',
        droppable: false,
        tagName: 'input',
        attributes: { type: 'checkbox' },
        classes: [],
        traits: [{
          type: TOGGLE_ID,
          label: 'Toggle widget',
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

      handleClick() {
        handleClick(this.getWidget(), editor)
      },

      init() {
        init.bind(this)(editor)
      },

      handleOnDrop() {
        handleOnDrop.bind(this)(configGetToggle, addToggle)
      },

      getWidget() {
        return getWidget.bind(this)(configGetToggle)
      },

      handleChangeID(event) {
        handleChangeID(this, event, WidgetType.TOGGLE)
      },

      destroy() {
        destroy.bind(this)(removeToggle)
      }
    })
  })
}