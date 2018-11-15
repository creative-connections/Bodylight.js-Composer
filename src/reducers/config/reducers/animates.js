import {
  ADD_WIDGET,
  RENAME_WIDGET,
  REMOVE_WIDGET,
  UPDATE_WIDGET,
  UPDATE_WIDGET_CONFIG
} from '@actions/types'

import {
  addWidget,
  removeWidget,
  updateWidget,
  renameWidget
} from '../commons/widget'

import update from 'immutability-helper'
import WidgetType from '@helpers/enum/WidgetType'

const defaultConfig = {
  id: null,
  name: null,
  originalName: null,
  js: null,
  hash: null
}

/*
const addAnimate = (state, payload, type, defaultConfig) => {
  if (type !== payload.type) { return state }
  defaultConfig = update(defaultConfig, {
    id: {$set: payload.id},
    name: {$set: payload.name},
    originalName: {$set: payload.name},
    js: {$set: payload.js},
    hash: {$set: payload.hash}
  })
  return update(state, { [payload.id]: {$set: defaultConfig} })
}
*/


const updateAnimate = (state, payload, type) => {
  if (type !== payload.type) { return state }

  return update(state, {
    [payload.id]: {
      js: {$set: payload.js},
      hash: {$set: payload.hash}
    }
  })
}

const type = WidgetType.ANIMATE

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_WIDGET:
      return addWidget(state, action.payload, type, defaultConfig)
    case RENAME_WIDGET:
      return renameWidget(state, action.payload, type)
    case REMOVE_WIDGET:
      return removeWidget(state, action.payload, type)
    case UPDATE_WIDGET:
      return updateAnimate(state, action.payload, type)
    case UPDATE_WIDGET_CONFIG:
      return updateWidget(state, action.payload, type)
  }
  return state
}

export const getAll = state => state
export const get = (state, id) => state[id]
