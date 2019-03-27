import { MODEL, MODEL_ID } from '../types.js'
import { init } from '../../commons/Components'
import { addModel } from '@actions'
import { configGetModel } from '@reducers'

import { handleOnDrop } from '../../commons/Components'

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
        handleOnDrop.bind(this)(configGetModel, addModel)
        this.remove()
      },

      destroy () {},
      handleClick () {}
    })
  })
}
