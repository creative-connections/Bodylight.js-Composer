import {
  ADD_WIDGET,
  RENAME_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@helpers/enum/WidgetType'

export const addToggle = () => ({
  type: ADD_WIDGET,
  payload: {
    id: generateID(),
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
