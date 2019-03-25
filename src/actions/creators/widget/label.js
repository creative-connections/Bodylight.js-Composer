import {
  ADD_WIDGET,
  RENAME_WIDGET,
  REMOVE_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@helpers/enum/WidgetType'

export const addLabel = (id) => ({
  type: ADD_WIDGET,
  payload: {
    id: id || generateID(),
    type: WidgetType.LABEL
  }
})

export const renameLabel = (label, name) => ({
  type: RENAME_WIDGET,
  payload: {
    widget: label,
    name
  }
})

export const removeLabel = (id) => ({
  type: REMOVE_WIDGET,
  payload: {
    id,
    type: WidgetType.LABEL
  }
})
