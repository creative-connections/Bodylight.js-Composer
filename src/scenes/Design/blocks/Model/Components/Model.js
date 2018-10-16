import { MODEL, MODEL_ID } from '../types.js'
import {
  handleChangeID,
  init,
  handleOnDrop,
  getWidget,
  destroy,
  handleClick
} from '../../commons/Components'
import WidgetType from '@helpers/enum/WidgetType'
import history from '@helpers/BrowserHistory'

export default (editor) => {
  const components = editor.DomComponents
  const defaultType = components.getType('default')
  const defaultModel = defaultType.model

  components.addType(MODEL, {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        draggable: '*',
        droppable: false,
        tagName: 'div',
        attributes: {},
        classes: [],
        traits: [{
          type: MODEL_ID,
          label: 'Model widget',
          name: 'id'
        }],
        resizable: true
      }),
      toHTML: function () {
        return ''
      }
    }, {
      isComponent: (el) => {
        if (el.tagName === 'MODEL') {
          return {type: MODEL}
        }
      }
    }),
    view: defaultType.view.extend({
      render: function () {
        this.el.innerHTML = ''
        return this
      },

      init () {
        init.bind(this)(editor)
      },

      handleOnDrop () {
        history.push(`${process.env.PATH}/add/model`)
        this.remove()
      },

      destroy () {},
      handleClick () {}
    })
  })
}
