import {
  ADD_WIDGET,
  RENAME_WIDGET,
  UPDATE_WIDGET,
  POPULATE_MODEL
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@enum/WidgetType'

export const addModel = (id = null) => ({
  type: ADD_WIDGET,
  payload: {
    id: id || generateID(),
    type: WidgetType.MODEL
  }
})

export const populateModel = (id, name, js, hash, modelDescription) => ({
  type: POPULATE_MODEL,
  payload: { id, type: WidgetType.MODEL, js, hash, name, modelDescription }
})

export const updateModel = (id, name, js, hash, modelDescription) => {
  return {
    type: UPDATE_WIDGET,
    payload: { id, type: WidgetType.MODEL, js, hash, name, modelDescription }
  }
}

export const renameModel = (model, name) => ({
  type: RENAME_WIDGET,
  payload: {
    widget: model,
    name
  }
})
