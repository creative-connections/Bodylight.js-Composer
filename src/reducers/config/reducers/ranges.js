import {
  ADD_WIDGET,
  RENAME_WIDGET,
  REMOVE_WIDGET,
  UPDATE_WIDGET_CONFIG,
  ADD_WIDGET_ACTION,
  REMOVE_WIDGET_ACTION,
  UPDATE_WIDGET_ACTION
} from '@actions/types'
import { REHYDRATE } from 'redux-persist'

import WidgetType from '@enum/WidgetType'
import {
  addWidgetAction,
  removeWidgetAction,
  updateWidgetAction
} from '../commons/actions'

import {
  renameWidget,
} from '../commons/widget'

import {
  addWidget,
  removeWidget,
  updateWidgetConfig
} from '../../widgets/commons/config'

const defaultConfig = {
  name: 'unnamed',

  target: {
    value: null,
    provider: null,
    array: false,
    indexes: null,
    'function': null,
    typeof: 'number'
  },

  events: [
    'change'
  ],

  actions: {

  },

  vertical: {
    typeof: 'boolean',
    value: false,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    'function': null
  },

  attributes: [
    'enabled',
    'min',
    'max',
    'reversed'
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

  reversed: {
    typeof: 'boolean',
    value: false,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    function: null
  },

  min: {
    typeof: 'number',
    value: 0,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    function: null
  },

  max: {
    typeof: 'number',
    value: 100,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    function: null
  }

}

const type = WidgetType.RANGE

export default function (state = {}, action) {
  switch (action.type) {
  case ADD_WIDGET:
    return addWidget(state, action.payload, type, defaultConfig)
  case RENAME_WIDGET:
    return renameWidget(state, action.payload, type)
  case REMOVE_WIDGET:
    return removeWidget(state, action.payload, type)
  case UPDATE_WIDGET_CONFIG:
    return updateWidgetConfig(state, action.payload, type)
  case ADD_WIDGET_ACTION:
    return addWidgetAction(state, action.payload, type)
  case REMOVE_WIDGET_ACTION:
    return removeWidgetAction(state, action.payload, type)
  case UPDATE_WIDGET_ACTION:
    return updateWidgetAction(state, action.payload, type)
  case REHYDRATE:
    return action.payload ? action.payload.config.ranges : state
  }
  return state
}

export const getAll = state => state
export const get = (state, id) => state[id]
