import {
  ADD_WIDGET,
  RENAME_WIDGET,
  REMOVE_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@enum/WidgetType'

export const addRange = (id) => ({
  type: ADD_WIDGET,
  payload: {
    id: id || generateID(),
    type: WidgetType.RANGE
  }
})

export const renameRange = (range, name) => ({
  type: RENAME_WIDGET,
  payload: {
    widget: range,
    name
  }
})

export const removeRange = (id) => ({
  type: REMOVE_WIDGET,
  payload: {
    id,
    type: WidgetType.RANGE
  }
})
