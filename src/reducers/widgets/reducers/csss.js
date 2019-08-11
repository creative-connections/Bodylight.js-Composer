import {
  ADD_WIDGET,
  REMOVE_WIDGET,
  UPDATE_WIDGET_CONFIG
} from '@actions/types'

import {
  addWidget,
  removeWidget,
  getWidgetsForDropdown,
  getWidget,
} from '../commons/widget.js'

import {
  updateWidget
} from '@reducers/config/commons/widget'

import WidgetType from '@enum/WidgetType'
import memoize from 'memoize-one'

const type = WidgetType.CSS

export default function (state = {}, action) {
  switch (action.type) {
  case ADD_WIDGET:
    return addWidget(state, action.payload, type)
  case REMOVE_WIDGET:
    return removeWidget(state, action.payload, type)
  case UPDATE_WIDGET_CONFIG:
    return updateWidget(state, action.payload, type)
  }
  return state
}

export const get = memoize(getWidget)
export const getAll = state => state
export const getForDropdown = memoize(getWidgetsForDropdown)
