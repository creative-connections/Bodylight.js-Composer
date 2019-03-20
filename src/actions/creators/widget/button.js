import {
  ADD_WIDGET,
  RENAME_WIDGET,
  REMOVE_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@enum/WidgetType'

export const addButton = (id = null) => ({
  type: ADD_WIDGET,
  payload: {
    id: id || generateID(),
    type: WidgetType.BUTTON
  }
})

export const renameButton = (button, name) => ({
  type: RENAME_WIDGET,
  payload: {
    widget: button,
    name
  }
})

export const removeButton = (id) => ({
  type: REMOVE_WIDGET,
  payload: {
    id,
    type: WidgetType.BUTTON
  }
})
