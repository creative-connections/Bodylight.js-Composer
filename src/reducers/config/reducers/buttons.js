import update from 'immutability-helper'
import {
  ADD_WIDGET,
  RENAME_WIDGET,
  UPDATE_WIDGET_CONFIG,
  ADD_WIDGET_ACTION,
  REMOVE_WIDGET_ACTION,
  UPDATE_WIDGET_ACTION
} from '@actions/types'

import WidgetType from '@helpers/enum/WidgetType'
import ButtonMode from '@helpers/enum/ButtonMode'
import {
  widgetActionAdd,
  widgetActionRemove,
  widgetActionUpdate
} from '../commons/actions'

import {
  addWidget,
  renameWidget,
  updateWidget
} from '../commons/widget'

const defaultConfig = {
  name: 'unnamed',
  mode: ButtonMode.CLICK,
  target: {
    value: null,
    provider: null,
    function: null,
    typeof: 'number'
  },

  events: [
    'click',
    'press',
    'release'
  ],

  actions: {

  },

  attributes: [
    'label',
    'enabled',
    'onClick',
    'onPress',
    'onRelease'
  ],

  label: {
    typeof: 'string',
    value: 'button',
    complex: false,
    provider: null,
    function: null
  },

  enabled: {
    typeof: 'boolean',
    value: true,
    complex: false,
    provider: null,
    function: null
  },

  visible: {
    typeof: 'boolean',
    value: true,
    complex: false,
    provider: null,
    function: null
  },

  onClick: {
    typeof: 'number',
    value: 1,
    complex: false,
    provider: null,
    function: null
  },

  onPress: {
    typeof: 'number',
    value: 1,
    complex: false,
    provider: null,
    function: null
  },

  onRelease: {
    typeof: 'number',
    value: 0,
    complex: false,
    provider: null,
    function: null
  }

}

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_WIDGET:
      return addWidget(state, action.payload, WidgetType.BUTTON, defaultConfig)
    case RENAME_WIDGET:
      return renameWidget(state, action.payload, WidgetType.BUTTON)
    case UPDATE_WIDGET_CONFIG:
      return updateWidget(state, action.payload, WidgetType.BUTTON)
  }

  if (action.type === ADD_WIDGET_ACTION) {
    if (action.payload.widget.type === WidgetType.BUTTON) {
      state = widgetActionAdd(state, action.payload)
    }
  }

  if (action.type === REMOVE_WIDGET_ACTION) {
    if (action.payload.widget.type === WidgetType.BUTTON) {
      state = widgetActionRemove(state, action.payload)
    }
  }

  if (action.type === UPDATE_WIDGET_ACTION) {
    if (action.payload.widget.type === WidgetType.BUTTON) {
      state = widgetActionUpdate(state, action.payload)
    }
  }

  return state
}

export const getAll = state => state
export const get = (state, id) => state[id]
