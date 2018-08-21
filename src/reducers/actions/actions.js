import update from 'immutability-helper'

import ArgumentType from '@helpers/enum/ArgumentType'

const defaultConfig = {
  pauseModel: {
    name: 'pauseModel',
    label: 'Pause model',
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
  }
}

export default function (state = defaultConfig, action) {
  return state
}

export const getActions = state => state
export const getDefaultForAction = action => defaultConfig[action]
