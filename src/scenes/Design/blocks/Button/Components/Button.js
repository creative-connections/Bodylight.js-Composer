import { BUTTON, BUTTON_ID } from '../types.js'
import { configGetButton } from '@reducers'
import { addButton, removeButton } from '@actions'
import {
  handleChangeID,
  init,
  handleOnDrop,
  handleComponentRemove,
  getWidget,
  destroy,
  handleClick
} from '../../commons/Components'
import WidgetType from '@helpers/enum/WidgetType'

export default (editor) => {
  const components = editor.DomComponents
  const defaultType = components.getType('default')
  const defaultModel = defaultType.model

  components.addType(BUTTON, {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        draggable: '*',
        droppable: false,
        tagName: 'button',
        attributes: {},
        classes: [],
        traits: [{
          type: BUTTON_ID,
          label: 'Button widget',
          name: 'id'
        }],
        resizable: true
      })
    }, {
      isComponent: (el) => {
        if (el.tagName === 'BUTTON') {
          return {type: BUTTON}
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
        handleOnDrop.bind(this)(configGetButton, addButton)
      },

      render: function () {
        defaultType.view.prototype.render.apply(this, arguments)

        let innerHTML = 'loading...'
        let button = this.getWidget()
        if (button) {
          innerHTML = `${button.name}`
        }
        this.el.innerHTML = innerHTML
        return this
      },

      handleClick () {
        handleClick(this.getWidget(), editor)
      },

      getWidget () {
        return getWidget.bind(this)(configGetButton)
      },

      handleChangeID (event) {
        handleChangeID(this, event, WidgetType.BUTTON)
      },

      destroy () {
        destroy.bind(this)(removeButton)
      }
    })
  })
}
