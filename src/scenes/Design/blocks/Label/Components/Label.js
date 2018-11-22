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
import WidgetType from '@helpers/enum/WidgetType'

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
        let innerHTML = 'Loading...'

        let label
        if ((label = this.getWidget()) != null) {
          innerHTML = `${label.name}`
        }

        this.el.innerHTML = innerHTML
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

      destroy() {
        destroy.bind(this)(removeLabel)
      },

      handleClick() {
        handleClick(this.getWidget(), editor)
      }
    })
  })
}