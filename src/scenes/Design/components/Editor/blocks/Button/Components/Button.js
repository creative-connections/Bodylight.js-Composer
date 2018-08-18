import { BUTTON, BUTTON_NAME, stripPrefix } from '../types.js'

import configureStore from '@src/configureStore'
import update from 'immutability-helper'

import { getButtons } from '@reducers'
import { editorPlaceButton, editorRemoveButton } from '@actions/actions'

import { handleChangeName } from '../../commons/Components'

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
          type: BUTTON_NAME,
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

      handleClick () {
        // We want to open component settings when BUTTON_ID is unset
        if (this.getButton() === null) {
          editor.Panels.getButton('views', 'open-tm').set('active', true)
        }
      },

      handleChangeName (event) {
        handleChangeName(this, event, editorPlaceButton, editorRemoveButton)
      },

      remove () {
        defaultType.view.prototype.remove.apply(this, arguments)

        const name = this.attr.name
        configureStore().store.dispatch(editorRemoveButton(stripPrefix(name)))
      }

    })
  })
}
