import {
  ADD_WIDGET,
  RENAME_WIDGET,
  EDITOR_WIDGET_PLACE,
  EDITOR_WIDGET_REMOVE
} from '@actions/types'

import {
  addWidget,
  getWidget,
  getWidgetsForDropdown,
  renameWidget,
  setWidgetPlaced
} from '../commons/widget.js'

import WidgetType from '@helpers/enum/WidgetType'
import memoize from 'memoize-one'

const type = WidgetType.TOGGLE

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_WIDGET:
      return addWidget(state, action.payload, type)
    case RENAME_WIDGET:
      return renameWidget(state, action.payload, type)

    case EDITOR_WIDGET_PLACE:
      return setWidgetPlaced(state, action.payload, type, true)
    case EDITOR_WIDGET_REMOVE:
      return setWidgetPlaced(state, action.payload, type, false)
  }
  return state
}

export const get = memoize(getWidget)
export const getAll = state => state
export const getForDropdown = memoize(getWidgetsForDropdown)
