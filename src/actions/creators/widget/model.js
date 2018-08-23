import {
  ADD_WIDGET,
  RENAME_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@helpers/enum/WidgetType'

export const addModel = (name, js, modelDescription) => {
  return {
    type: ADD_WIDGET,
    payload: {
      id: generateID(),
      type: WidgetType.MODEL,
      js,
      name,
      modelDescription
    }
  }
}

export const renameModel = (model, name) => ({
  type: RENAME_WIDGET,
  payload: {
    widget: model,
    name
  }
})
