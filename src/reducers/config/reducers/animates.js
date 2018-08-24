import {
  ADD_WIDGET,
  RENAME_WIDGET,
  UPDATE_WIDGET_CONFIG
} from '@actions/types'

import {
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

const addModel = (state, payload, type, defaultConfig) => {
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

const type = WidgetType.ANIMATE

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_WIDGET:
      return addModel(state, action.payload, type, defaultConfig)
    case RENAME_WIDGET:
      return renameWidget(state, action.payload, type)
    case UPDATE_WIDGET_CONFIG:
      return updateWidget(state, action.payload, type)
  }
  return state
}

export const getAll = state => state
export const get = (state, id) => state[id]
