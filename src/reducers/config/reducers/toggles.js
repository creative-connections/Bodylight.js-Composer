import {
  ADD_WIDGET,
  RENAME_WIDGET,
  REMOVE_WIDGET,
  UPDATE_WIDGET_CONFIG,
  ADD_WIDGET_ACTION,
  REMOVE_WIDGET_ACTION,
  UPDATE_WIDGET_ACTION
} from '@actions/types'

import WidgetType from '@helpers/enum/WidgetType'
import {
  addWidgetAction,
  removeWidgetAction,
  updateWidgetAction
} from '../commons/actions'

import {
  addWidget,
  renameWidget,
  removeWidget,
  updateWidget
} from '../commons/widget'

const defaultConfig = {
  name: 'unnamed',
  target: {
    value: null,
    provider: null,
    array: false,
    indexes: null,
    function: null,
    typeof: false
  },

  events: [
    'change',
    'toggleOn',
    'toggleOff'
  ],

  actions: {

  },

  attributes: [
    'enabled',
    'visible',
    'onToggleOn',
    'onToggleOff'
  ],

  enabled: {
    typeof: 'boolean',
    value: true,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    function: null
  },

  visible: {
    typeof: 'boolean',
    value: true,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    function: null
  },

  onToggleOn: {
    typeof: 'number',
    value: 1,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    function: null
  },

  onToggleOff: {
    typeof: 'number',
    value: 1,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    function: null
  }
}

const type = WidgetType.TOGGLE

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_WIDGET:
      return addWidget(state, action.payload, type, defaultConfig)
    case RENAME_WIDGET:
      return renameWidget(state, action.payload, type)
    case REMOVE_WIDGET:
      return removeWidget(state, action.payload, type)
    case UPDATE_WIDGET_CONFIG:
      return updateWidget(state, action.payload, type)
    case ADD_WIDGET_ACTION:
      return addWidgetAction(state, action.payload, type)
    case REMOVE_WIDGET_ACTION:
      return removeWidgetAction(state, action.payload, type)
    case UPDATE_WIDGET_ACTION:
      return updateWidgetAction(state, action.payload, type)
  }
  return state
}

export const getAll = state => state
export const get = (state, id) => state[id]
