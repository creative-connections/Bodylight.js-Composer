import {
  ADD_WIDGET,
  RENAME_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@helpers/enum/WidgetType'

export const addRange = () => ({
  type: ADD_WIDGET,
  payload: {
    id: generateID(),
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
