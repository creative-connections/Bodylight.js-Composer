import {
  ADD_WIDGET,
  RENAME_WIDGET,
  POPULATE_MODEL,
  UPDATE_WIDGET
} from '@actions/types'

import {
  getWidget,
  getWidgetsForDropdown,
  renameWidget
} from '../commons/widget.js'

import WidgetType from '@enum/WidgetType'
import memoize from 'memoize-one'
import update from 'immutability-helper'

const addModel = (state, payload, type) => {
  if (type !== payload.type) { return state }
  const model = {
    id: payload.id,
    name: 'empty model',
    type: payload.type,
    populated: false
  }
  return update(state, { [payload.id]: {$set: model} })
}

const populateModel = (state, payload) => {
  return update(state, { [payload.id]: {
    name: {$set: payload.name},
    populated: {$set: true}
  }})
}

const updateModel = (state, payload) => {
  if (type !== payload.type) { return state }

  return update(state, { [payload.id]: {
    populated: {$set: true}
  }})
}

const type = WidgetType.MODEL

export default function (state = {}, action) {
  switch (action.type) {
  case ADD_WIDGET:
    return addModel(state, action.payload, type)
  case POPULATE_MODEL:
    return populateModel(state, action.payload)
  case UPDATE_WIDGET:
    return updateModel(state, action.payload, type)
  case RENAME_WIDGET:
    return renameWidget(state, action.payload, type)
  }
  return state
}

export const getAll = state => state
export const get = memoize(getWidget)
export const getForDropdown = memoize(getWidgetsForDropdown)
