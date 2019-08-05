import { LABEL, LABEL_ID } from '../types.js'
import { configGetLabel } from '@reducers'
import { addLabel, removeLabel } from '@actions'
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

  components.addType(LABEL, {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        draggable: '*',
        droppable: false,
        tagName: 'label',
        attributes: {},
        classes: [],
        traits: [{
          type: LABEL_ID,
          label: 'Label widget',
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

      render: function () {
        defaultType.view.prototype.render.apply(this, arguments)

        if (this.subscribed !== true) {
          const widget = this.getWidget()
          if (widget != null) {
            observeStore(state => state.config.labels[widget.id].label.value, () => {
              this.onRender()
            }, true, 'editor')
            observeStore(state => state.config.labels[widget.id].name, () => {
              this.onRender()
            }, true, 'editor')
            this.subscribed = true
          }
        }

        return this
      },

      init() {
        init.bind(this)(editor)
      },

      handleOnDrop() {
        handleOnDrop.bind(this)(configGetLabel, addLabel)
      },

      getWidget() {
        return getWidget.bind(this)(configGetLabel)
      },

      handleChangeID(event) {
        handleChangeID(this, event, WidgetType.LABEL)
      },

      onRender() {
        defaultType.view.prototype.onRender.apply(this, arguments)
        
        const widget = this.getWidget()
        if (widget != null) {
          this.el.innerHTML = widget.label.complex ? widget.name : widget.label.value
        } else {
          this.el.innerHTML = "Loading..."
        }
      },

      destroy() {
        destroy.bind(this)(removeLabel)
      },

      handleClick() {
        handleClick(this.getWidget(), editor)
      }
    })
  })
}
