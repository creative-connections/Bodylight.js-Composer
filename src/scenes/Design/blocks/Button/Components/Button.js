import { BUTTON, BUTTON_ID } from '../types.js'
import { configGetButton } from '@reducers'
import { addButton, removeButton } from '@actions'
import {
  handleChangeID,
  init,
  handleOnDrop,
  getWidget,
  destroy,
  handleClick
} from '../../commons/Components'
import WidgetType from '@enum/WidgetType'
import { observeStore } from '@src/configureStore'

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
          return { type: BUTTON }
        }
      }
    }),
    view: defaultType.view.extend({
      events: {
        changeID: 'handleChangeID',
        click: 'handleClick'
      },

      init() {
        init.bind(this)(editor)

        const widget = this.getWidget()
        if (widget != null) {
          observeStore(state => state.config.buttons[widget.id].label.value, () => {
            this.onRender()
          }, true, 'editor')
          observeStore(state => state.config.buttons[widget.id].name, () => {
            this.onRender()
          }, true, 'editor')
        }
      },

      handleOnDrop() {
        handleOnDrop.bind(this)(configGetButton, addButton)
      },

      render: function () {
        defaultType.view.prototype.render.apply(this, arguments)

        let innerHTML = '>UNSET<'
        let button = this.getWidget()
        if (button) {
          innerHTML = `${button.name}`
        }
        this.el.innerHTML = innerHTML
        return this
      },

      onRender() {
        const widget = this.getWidget()
        if (widget != null) {
          this.el.innerHTML = widget.label.complex ? widget.name : widget.label.value
        }
      },

      handleClick() {
        handleClick(this.getWidget(), editor)
      },

      getWidget() {
        return getWidget.bind(this)(configGetButton)
      },

      handleChangeID(event) {
        handleChangeID(this, event, WidgetType.BUTTON)
      },

      destroy() {
        destroy.bind(this)(removeButton)
      }
    })
  })
}
