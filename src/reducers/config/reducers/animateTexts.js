import {
  REMOVE_WIDGET,
  UPDATE_WIDGET_CONFIG,
  UPDATE_WIDGET
} from '@actions/types'
import { REHYDRATE } from 'redux-persist'

import WidgetType from '@enum/WidgetType'
import update from 'immutability-helper'

import { updateWidget, removeWidget } from '../commons/widget'

const defaultConfig = {
  name: null,
  parent: null,
  attributes: [
    'value',
    'visible'
  ],
  value: {
    value: '',
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    function: null,
    typeof: 'string'
  },
  visible: {
    value: true,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    function: null,
    typeof: 'boolean'
  }
}

const type = WidgetType.ANIMATE_TEXT

const addAnimateText = (state, payload) => {
  if (type !== payload.widget.type) { return state }
  let config = update(defaultConfig, {
    id: { $set: payload.widget.id },
    name: { $set: payload.widget.name },
    parent: { $set: payload.widget.parent }
  })
  return update(state, {
    [payload.widget.id]: { $set: config }
  })
}

const updateAnimateText = (state, payload) => {
  if (type !== payload.widget.type) { return state }
  if (state[payload.widget.id] === undefined) {
    state = addAnimateText(state, payload)
  }
  state = updateWidget(state, payload, type)
  return state
}

const removeMissingAnimateTexts = (state, payload) => {
  if (WidgetType.ANIMATE !== payload.type) { return state }

  Object.entries(state).forEach(([id, current]) => {
    if (current.parent !== payload.id) {
      return
    }

    let found = false
    Object.entries(payload.text).forEach(([, text]) => {
      if (text.name === current.name) {
        found = true
      }
    })
    if (!found) {
      state = update(state, { $unset: [id] })
    }
  })

  return state
}

export default function (state = {}, action) {
  switch (action.type) {
  case UPDATE_WIDGET:
    return removeMissingAnimateTexts(state, action.payload)
  case REMOVE_WIDGET:
    return removeWidget(state, action.payload, WidgetType.ANIMATE)
  case UPDATE_WIDGET_CONFIG:
    return updateAnimateText(state, action.payload)
  case REHYDRATE:
    return action.payload ? action.payload.config.animateTexts : state
  }
  return state
}

export const getAll = state => state
export const get = (state, id) => {
  if (state[id] === undefined) {
    return defaultConfig
  }
  return state[id]
}