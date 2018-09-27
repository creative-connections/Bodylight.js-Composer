import { LABEL, LABEL_ID } from '../types.js'
import { configGetLabel } from '@reducers'
import { editorWidgetRemove } from '@actions'
import { handleChangeID } from '../../commons/Components'
import configureStore from '@src/configureStore'
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
    }, {
      isComponent: (el) => {
        if (el.tagName === 'LABEL') {
          return {type: LABEL}
        }
      }
    }),
    view: defaultType.view.extend({
      events: {
        changeID: 'handleChangeID',
        click: 'handleClick'
      },

      render: function () {
        defaultType.view.prototype.render.apply(this, arguments)
        let innerHTML = 'Label UNSET'

        let label
        if ((label = this.getLabel()) !== null) {
          innerHTML = `${label.name}`
        }

        this.el.innerHTML = innerHTML
        return this
      },

      /**
       * Loads label configuration from Redux state.
       * @return {label configuration}
       */
      getLabel () {
        const id = this.attr.id
        if (typeof id === 'undefined' || id === null || id === '') {
          return null
        }
        return configGetLabel(configureStore().store.getState(), id)
      },

      handleClick () {
        // We want to open component settings when LABEL_ID is unset
        if (this.getLabel() === null) {
          editor.Panels.getButton('views', 'open-tm').set('active', true)
        }
      },

      handleChangeID (event) {
        handleChangeID(this, event, WidgetType.LABEL)
      },

      remove () {
        defaultType.view.prototype.remove.apply(this, arguments)

        const id = this.attr.id
        if (id) {
          configureStore().store.dispatch(editorWidgetRemove(id, WidgetType.LABEL))
        }
      }

    })
  })
}
