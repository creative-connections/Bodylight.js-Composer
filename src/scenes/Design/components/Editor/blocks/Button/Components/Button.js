import { BUTTON, BUTTON_ID } from '../types.js'

import configureStore from '@src/configureStore'
import update from 'immutability-helper'

import { getButtons } from '@reducers'
import { editorPlaceButton, editorRemoveButton } from '@actions/actions'

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
          label: 'name',
          name: 'name'
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
        changeName: 'handleChangeName',
        click: 'handleClick'
      },

      render: function () {
        defaultType.view.prototype.render.apply(this, arguments)
        this.el.innerHTML = `btn: ${this.el.name}`
        return this
      },

      /**
       * Loads button configuration from Redux state.
       * @return {button configuration}
       */
      getButton () {
        const name = this.attr.name
        const buttons = getButtons(configureStore().store.getState())

        if (typeof name === 'undefined' || name === null || name === '' ||
            typeof buttons[name] === 'undefined') {
          return null
        }

        return update(buttons[name], {name: {$set: name}})
      },

      /**
       * Callback on the event 'changeName'. Button provider has changed, we
       * need to redraw it in the editor.
       */
      handleChangeName ({detail}) {
        const name = this.el.getAttribute('name')

        // update redux state that we have changed our endpoint
        const {store} = configureStore()
        store.dispatch(editorRemoveButton(detail.previous))
        store.dispatch(editorPlaceButton(detail.new))

        /*
         * Trait sets this automatically somewhere down the lifecycle, but we
         * need the value before that happens. This should be safe.
         */
        this.attr.name = name

        this.render()
      },

      handleClick () {
        // We want to open component settings when BUTTON_ID is unset
        if (this.getButton() === null) {
          editor.Panels.getButton('views', 'open-tm').set('active', true)
        }
      }
    })
  })
}
