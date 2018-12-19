import {
  ADD_WIDGET,
  RENAME_WIDGET,
  REMOVE_WIDGET,
  UPDATE_WIDGET,
  UPDATE_WIDGET_CONFIG,
  POPULATE_ANIMATE
} from '@actions/types'
import { REHYDRATE } from 'redux-persist'

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

const populateAnimate = (state, payload, type) => {
  if (type !== payload.type) { return state }
  return update(state, {
    [payload.id]: {
      name: { $set: payload.name },
      originalName: { $set: payload.originalName },
      js: { $set: payload.js },
      hash: { $set: payload.hash }
    }
  })
}


const updateAnimate = (state, payload, type) => {
  if (type !== payload.type) { return state }

  return update(state, {
    [payload.id]: {
      js: { $set: payload.js },
      hash: { $set: payload.hash }
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
  case POPULATE_ANIMATE:
    return populateAnimate(state, action.payload, type)
  case REHYDRATE:
    return action.payload ? action.payload.config.animates : state
  }
  return state
}

export const getAll = state => state
export const get = (state, id) => state[id]