import { BUTTON, BUTTON_ID } from '../types.js'

import configureStore from '@src/configureStore'
import update from 'immutability-helper'

import { configGetButton } from '@reducers'
import { editorPlaceButton, editorRemoveButton } from '@actions/actions'

import { handleChangeID } from '../../commons/Components'

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
        // We want to open component settings when BUTTON_ID is unset
        if (this.getButton() === null) {
          editor.Panels.getButton('views', 'open-tm').set('active', true)
        }
      },

      handleChangeID (event) {
        handleChangeID(this, event, editorPlaceButton, editorRemoveButton)
      },

      remove () {
        defaultType.view.prototype.remove.apply(this, arguments)

        const id = this.attr.id
        configureStore().store.dispatch(editorRemoveButton(id))
      }

    })
  })
}
