import {
  ADD_WIDGET,
  RENAME_WIDGET,
  UPDATE_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@helpers/enum/WidgetType'

export const addModel = (name, js, hash, modelDescription) => {
  return {
    type: ADD_WIDGET,
    payload: {
      id: generateID(),
      type: WidgetType.MODEL,
      js,
      hash,
      name,
      modelDescription
    }
  }
}

export const updateModel = (id, name, js, hash, modelDescription) => {
  return {
    type: UPDATE_WIDGET,
    payload: {
      id,
      type: WidgetType.MODEL,
      js,
      hash,
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
