import {
  ADD_WIDGET,
  RENAME_WIDGET,
  REMOVE_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@enum/WidgetType'

export const addToggle = (id = null) => ({
  type: ADD_WIDGET,
  payload: {
    id: id || generateID(),
    type: WidgetType.TOGGLE
  }
})

export const renameToggle = (toggle, name) => ({
  type: RENAME_WIDGET,
  payload: {
    widget: toggle,
    name
  }
})

export const removeToggle = (id) => ({
  type: REMOVE_WIDGET,
  payload: {
    id,
    type: WidgetType.TOGGLE
  }
})
