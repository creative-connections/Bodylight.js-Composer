import {
  ADD_WIDGET,
  RENAME_WIDGET,
  REMOVE_WIDGET,
  UPDATE_WIDGET_CONFIG,
} from '@actions/types'

import WidgetType from '@helpers/enum/WidgetType'

import {
  addWidget,
  renameWidget,
  removeWidget,
  updateWidget
} from '../../config/commons/widget'

const type = WidgetType.TICKER
const defaultConfig = {
  name: 'ticker',
  type,

  interval: 20,
  targets: []
}

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
  }
  return state
}

export const getForDropdown = state => state
export const getAll = state => state
export const get = (state, id) => state[id]
