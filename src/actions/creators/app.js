import {
  NEW_PROJECT,
  SELECT_WIDGET,
  RENAME_PROJECT,
  UPDATE_EXPORT_OPTION,
  LOAD_STORE
} from '@actions/types'

export const selectWidget = id => ({
  type: SELECT_WIDGET,
  payload: { id: id }
})

export const newProject = () => ({
  type: NEW_PROJECT,
  payload: null
})

export const renameProject = (name) => ({
  type: RENAME_PROJECT,
  payload: name
})

export const updateExportOption = (name, value) => ({
  type: UPDATE_EXPORT_OPTION,
  payload: { name, value }
})

export const loadStore = state => ({
  type: LOAD_STORE,
  payload: state
})