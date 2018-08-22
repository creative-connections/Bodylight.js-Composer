import update from 'immutability-helper'
import {
  ADD_WIDGET,
  RENAME_WIDGET,
  CONFIG_BUTTON_UPDATE,
  CONFIG_BUTTON_REMOVE,
  RENAME_BUTTON,
  REMOVE_BUTTON,
  WIDGET_ACTION_ADD,
  WIDGET_ACTION_REMOVE,
  WIDGET_ACTION_UPDATE
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
  renameWidget
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

const remove = (state, name) => {
  return update(state, {
    $unset: [name]
  })
}

const setConfig = (state, name, config) => {
  return update(state, {
    [name]: {$set: config}
  })
}

const checkUndefined = (state, name) => {
  if (state[name] === undefined) {
    state = update(state, { [name]: {$set: defaultConfig} })
    state = update(state, { [name]: {name: {$set: name}} })
  }
  return state
}

const updateKeyValue = (state, name, key, value) => {
  state = checkUndefined(state, name)
  return update(state, {
    [name]: {[key]: {$set: value}}
  })
}

const updateKeyKeyValue = (state, name, key1, key2, value) => {
  state = checkUndefined(state, name)
  return update(state, {
    [name]: {[key1]: {[key2]: {$set: value}}}
  })
}

export default function (state = {}, action) {
  if (action.type === ADD_WIDGET) {
    return addWidget(state, action.payload, WidgetType.BUTTON, defaultConfig)
  }

  if (action.type === RENAME_WIDGET) {
    return renameWidget(state, action.payload, WidgetType.BUTTON)
  }

  if (action.type === CONFIG_BUTTON_UPDATE) {
    const { button, key, value } = action.payload
    const keys = key.split('.')
    if (keys.length === 1) {
      state = updateKeyValue(state, button.name, keys[0], value)
    } else if (keys.length === 2) {
      state = updateKeyKeyValue(state, button.name, keys[0], keys[1], value)

      // setting complex to false, means we have to clean up provider and function
      if (keys[1] === 'complex' && value === false) {
        state = updateKeyKeyValue(state, button.name, keys[0], 'provider', null)
        state = updateKeyKeyValue(state, button.name, keys[0], 'function', null)
      }
    }
    return state
  }

  if (action.type === WIDGET_ACTION_ADD) {
    if (action.payload.widget.type === WidgetType.BUTTON) {
      state = widgetActionAdd(state, action.payload)
    }
  }

  if (action.type === WIDGET_ACTION_REMOVE) {
    if (action.payload.widget.type === WidgetType.BUTTON) {
      state = widgetActionRemove(state, action.payload)
    }
  }

  if (action.type === WIDGET_ACTION_UPDATE) {
    if (action.payload.widget.type === WidgetType.BUTTON) {
      state = widgetActionUpdate(state, action.payload)
    }
  }

  return state
}

export const getAll = state => state
export const get = (state, id) => state[id]
