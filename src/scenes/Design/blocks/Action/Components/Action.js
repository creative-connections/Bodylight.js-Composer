import { ACTION, ACTION_ID } from '../types.js'
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
import { addAction } from '@actions'
import configureStore from '@src/configureStore'

export default (editor) => {
  const components = editor.DomComponents
  const defaultType = components.getType('default')
  const defaultModel = defaultType.model

  components.addType(ACTION, {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        draggable: '*',
        droppable: false,
        tagName: 'div',
        attributes: {},
        classes: [],
        traits: [{
          type: ACTION_ID,
          label: 'Action widget',
          name: 'id'
        }],
        resizable: true
      }),
      toHTML: function () {
        return ''
      }
    }, {
      isComponent: (el) => {
        if (el.tagName === 'ACTION') {
          return {type: ACTION}
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
        const store = configureStore().store
        store.dispatch(addAction())
        editor.Panels.getButton('views', 'open-connect').set('active', true)
      },

      destroy () {},
      handleClick () {}
    })
  })
}
