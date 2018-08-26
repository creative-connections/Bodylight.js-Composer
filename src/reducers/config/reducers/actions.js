import {
  ADD_WIDGET,
  RENAME_WIDGET,
  UPDATE_WIDGET_CONFIG
} from '@actions/types'

import WidgetType from '@helpers/enum/WidgetType'
import ArgumentType from '@helpers/enum/ArgumentType'

import {
  addWidget,
  renameWidget,
  updateWidget
} from '../commons/widget'

const defaultState = {
  'GHH8IZOdQtm49DsQqvYerw': {
    id: 'GHH8IZOdQtm49DsQqvYerw',
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
  'V39ogkQlQ3SZIcPVkttVHg': {
    id: 'V39ogkQlQ3SZIcPVkttVHg',
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
  'TTyO1JbbRmmPTid4aWp9XQ': {
    id: 'TTyO1JbbRmmPTid4aWp9XQ',
    name: 'updateThisWidget',
    label: 'Update this widget',
    description: 'Updates values for this widget. Useful for refreshing unprovided functions',
    args: {
      length: 0
    },
    function: `window.setTimeout(this.updateComponent(), 50)`
  }
}

const defaultConfig = {
  id: null,
  name: 'unnamed',
  label: '',
  description: '',
  args: {
    length: 0
  },
  function: ''
}

const type = WidgetType.ACTION

export default function (state = defaultState, action) {
  switch (action.type) {
    case ADD_WIDGET:
      return addWidget(state, action.payload, type, defaultConfig)
    case RENAME_WIDGET:
      return renameWidget(state, action.payload, type)
    case UPDATE_WIDGET_CONFIG:
      return updateWidget(state, action.payload, type)
  }
  return state
}

export const getAll = state => state
export const get = (state, id) => state[id]
