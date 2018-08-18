import { RANGE, RANGE_NAME, stripPrefix } from '../types.js'

import configureStore from '@src/configureStore'
import { getRanges } from '@reducers'

import update from 'immutability-helper'

import { handleChangeName } from '../../commons/Components'

import { editorPlaceRange, editorRemoveRange } from '@actions/actions'

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
          type: RANGE_NAME,
          label: 'Range',
          name: 'name'
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
        changeName: 'handleChangeName',
        click: 'handleClick'
      },

      /**
       * Loads range configuration from Redux state.
       * @return {range configuration}
       */
      getRange () {
        const name = this.attr.name
        const ranges = getRanges(configureStore().store.getState())

        if (typeof name === 'undefined' || name === null || name === '' ||
            typeof ranges[name] === 'undefined') {
          return null
        }

        return update(ranges[name], {name: {$set: name}})
      },

      handleChangeName (event) {
        handleChangeName(this, event, editorPlaceRange, editorRemoveRange)
      },

      remove () {
        defaultType.view.prototype.remove.apply(this, arguments)

        const name = this.attr.name
        configureStore().store.dispatch(editorRemoveRange(stripPrefix(name)))
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
