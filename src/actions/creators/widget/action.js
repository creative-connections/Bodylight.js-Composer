import {
  ADD_WIDGET,
  RENAME_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@enum/WidgetType'

export const addAction = () => ({
  type: ADD_WIDGET,
  payload: {
    id: generateID(),
    type: WidgetType.ACTION
  }
})

export const renameAction = (action, name) => ({
  type: RENAME_WIDGET,
  payload: {
    widget: action,
    name
  }
})
