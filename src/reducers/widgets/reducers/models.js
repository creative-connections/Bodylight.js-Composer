import {
  ADD_WIDGET,
  RENAME_WIDGET
} from '@actions/types'

import {
  getWidget,
  getWidgetsForDropdown,
  renameWidget
} from '../commons/widget.js'

import WidgetType from '@helpers/enum/WidgetType'
import memoize from 'memoize-one'
import update from 'immutability-helper'

const addModel = (state, payload, type) => {
  if (type !== payload.type) { return state }
  const model = {
    id: payload.id,
    name: payload.name,
    type: payload.type
  }
  return update(state, { [payload.id]: {$set: model} })
}

const type = WidgetType.MODEL

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_WIDGET:
      return addModel(state, action.payload, type)
    case RENAME_WIDGET:
      return renameWidget(state, action.payload, type)
  }
  return state
}

export const getAll = state => state
export const get = memoize(getWidget)
export const getForDropdown = memoize(getWidgetsForDropdown)
