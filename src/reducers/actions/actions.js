import update from 'immutability-helper'

import ArgumentType from '@helpers/enum/ArgumentType'

const defaultConfig = {
  pauseModel: {
    name: 'stopModel',
    label: 'Stop model',
    description: 'Pauses the selected model and any synchronized models.',
    args: {
      length: 1,
      0: {
        name: 'model',
        type: ArgumentType.MODEL,
        value: null
      }
    },
    function: `getModel(model).pause()`
  },
  startModel: {
    name: 'startModel',
    label: 'Start model',
    description: 'Starts the selected model and any synchronized models.',
    args: {
      length: 1,
      0: {
        name: 'model',
        type: ArgumentType.MODEL,
        value: null
      }
    },
    function: `getModel(model).play()`
  },
  updateThisWidget: {
    name: 'updateThisWidget',
    label: 'Update this widget',
    description: 'Updates values for this widget. Useful for refreshing unprovided functions',
    args: {
      length: 0
    },
    function: `window.setTimeout(this.updateComponent(), 50)`
  }
}

export default function (state = defaultConfig, action) {
  return state
}

export const getActions = state => state
export const getDefaultForAction = action => defaultConfig[action]
