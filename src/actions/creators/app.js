import { NEW_PROJECT, SELECT_WIDGET, RENAME_PROJECT } from '@actions/types'

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
