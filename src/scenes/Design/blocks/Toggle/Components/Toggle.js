import { TOGGLE, TOGGLE_ID } from '../types.js'
import { configGetToggle } from '@reducers'
import { editorWidgetRemove } from '@actions'
import { handleChangeID } from '../../commons/Components'
import configureStore from '@src/configureStore'
import WidgetType from '@helpers/enum/WidgetType'

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
        attributes: {type: 'checkbox'},
        classes: [],
        traits: [{
          type: TOGGLE_ID,
          label: 'Toggle widget',
          name: 'id'
        }],
        resizable: true
      })
    }, {
      isComponent: (el) => {
        if (el.tagName === 'TOGGLE') {
          return {type: TOGGLE}
        }
      }
    }),
    view: defaultType.view.extend({
      events: {
        changeID: 'handleChangeID',
        click: 'handleClick'
      },

      /**
       * Loads toggle configuration from Redux state.
       * @return {toggle configuration}
       */
      getToggle () {
        const id = this.attr.id
        if (typeof id === 'undefined' || id === null || id === '') {
          return null
        }
        return configGetToggle(configureStore().store.getState(), id)
      },

      handleClick () {
        // We want to open component settings when TOGGLE_ID is unset
        if (this.getToggle() === null) {
          editor.Panels.getButton('views', 'open-tm').set('active', true)
        }
      },

      handleChangeID (event) {
        handleChangeID(this, event, WidgetType.TOGGLE)
      },

      remove () {
        defaultType.view.prototype.remove.apply(this, arguments)

        const id = this.attr.id
        if (id) {
          configureStore().store.dispatch(editorWidgetRemove(id, WidgetType.TOGGLE))
        }
      }

    })
  })
}
