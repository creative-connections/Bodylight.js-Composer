import { CSS, CSS_ID } from '../types.js'
import { init } from '../../commons/Components'
import { addCss } from '@actions'
import configureStore from '@src/configureStore'

export default (editor) => {
  const components = editor.DomComponents
  const defaultType = components.getType('default')
  const defaultModel = defaultType.model

  components.addType(CSS, {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        draggable: '*',
        droppable: false,
        tagName: 'div',
        attributes: {},
        classes: [],
        traits: [{
          type: CSS_ID,
          label: 'Css widget',
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
        const store = configureStore().store
        store.dispatch(addCss())
        editor.Panels.getButton('views', 'open-connect').set('active', true)
        this.remove()
      },

      destroy () {},
      handleClick () {}
    })
  })
}
