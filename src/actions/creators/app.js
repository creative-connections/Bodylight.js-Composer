import { NEW_PROJECT, SELECT_WIDGET, RENAME_PROJECT, UPDATE_EXPORT_OPTION } from '@actions/types'

export const selectWidget = id => {
  return {
    type: SELECT_WIDGET,
    payload: {id: id}
  }
}

export const newProject = () => {
  return {
    type: NEW_PROJECT,
    payload: null
  }
}

export const renameProject = (name) => {
  return {
    type: RENAME_PROJECT,
    payload: name
  }
}

export const updateExportOption = (name, value) => {
  return {
    type: UPDATE_EXPORT_OPTION,
    payload: { name, value }
  }
}
