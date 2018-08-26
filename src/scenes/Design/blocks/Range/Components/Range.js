import { RANGE, RANGE_ID } from '../types.js'
import { configGetRange } from '@reducers'
import { handleChangeID } from '../../commons/Components'
import { editorWidgetRemove } from '@actions/actions'
import configureStore from '@src/configureStore'
import WidgetType from '@helpers/enum/WidgetType'

export default (editor) => {
  const components = editor.DomComponents
  const defaultType = components.getType('default')
  const defaultModel = defaultType.model

  components.addType(RANGE, {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        draggable: '*',
        droppable: false,
        tagName: 'input',
        attributes: {type: 'range'},
        classes: [],
        traits: [{
          type: RANGE_ID,
          label: 'Range',
          name: 'id'
        }],
        resizable: true
      })
    }, {
      isComponent: (el) => {
        if (el.tagName === 'INPUT') {
          return {type: RANGE}
        }
      }
    }),
    view: defaultType.view.extend({
      events: {
        changeID: 'handleChangeID',
        click: 'handleClick'
      },

      /**
       * Loads range configuration from Redux state.
       * @return {range configuration}
       */
      getRange () {
        const id = this.attr.id

        if (typeof id === 'undefined' || id === null || id === '') {
          return null
        }
        return configGetRange(configureStore().store.getState(), id)
      },

      handleChangeID (event) {
        handleChangeID(this, event, WidgetType.RANGE)
      },

      remove () {
        defaultType.view.prototype.remove.apply(this, arguments)

        const id = this.attr.id
        if (id) {
          configureStore().store.dispatch(editorWidgetRemove(id, WidgetType.RANGE))
        }
      },

      handleClick () {
        // We want to open component settings when RANGE_ID is unset
        if (this.getRange() === null) {
          editor.Panels.getButton('views', 'open-tm').set('active', true)
        }
      }
    })
  })
}
