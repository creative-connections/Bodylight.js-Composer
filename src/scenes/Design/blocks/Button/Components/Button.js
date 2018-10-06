import { BUTTON, BUTTON_ID } from '../types.js'
import { configGetButton } from '@reducers'
import { addButton, removeButton } from '@actions'
import generateID from '@helpers/generateID'
import { handleChangeID, init, handleComponentRemove } from '../../commons/Components'
import configureStore from '@src/configureStore'
import WidgetType from '@helpers/enum/WidgetType'

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
          return {type: BUTTON}
        }
      }
    }),
    view: defaultType.view.extend({
      events: {
        changeID: 'handleChangeID',
        click: 'handleClick'
      },

      init () {
        init.bind(this)(editor)
      },

      handleComponentRemove (model) {
        handleComponentRemove.bind(this)(model)
      },

      handleOnDrop () {
        const store = configureStore().store
        const id = generateID()

        let unsubscribe = store.subscribe(() => {
          const config = configGetButton(store.getState(), id)
          // look for WIDGET_ADD to finish adding our id
          if (config) {
            unsubscribe() // don't listen anymore
            this.attr.id = id
            this.render()
          }
        })

        store.dispatch(addButton(id))
      },

      render: function () {
        defaultType.view.prototype.render.apply(this, arguments)
        let innerHTML = 'Button UNSET'

        let button
        if ((button = this.getButton()) !== null) {
          innerHTML = `${button.name}`
        }

        this.el.innerHTML = innerHTML
        return this
      },

      /**
       * Loads button configuration from Redux state.
       * @return {button configuration}
       */
      getButton () {
        const id = this.attr.id
        if (typeof id === 'undefined' || id === null || id === '') {
          return null
        }
        return configGetButton(configureStore().store.getState(), id)
      },

      handleClick () {
        if (this.getButton() !== null) {
          editor.Panels.getButton('views', 'open-connect').set('active', true)
        }
      },

      handleChangeID (event) {
        handleChangeID(this, event, WidgetType.BUTTON)
      },

      remove () {
        defaultType.view.prototype.remove.apply(this, arguments)

        if (this.attr.id) {
          configureStore().store.dispatch(removeButton(this.attr.id))
        }
      }

    })
  })
}
