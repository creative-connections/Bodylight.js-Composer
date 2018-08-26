import {
  EDITOR_WIDGET_PLACE,
  EDITOR_WIDGET_REMOVE,
  EDITOR_STORAGE_STORE,
  EDITOR_STORAGE_CLEAR
} from '@actions/types'

export const editorStorageStore = data => ({
  type: EDITOR_STORAGE_STORE,
  payload: data
})

export const editorStorageClear = () => ({
  type: EDITOR_STORAGE_CLEAR
})

export const editorWidgetPlace = (id, type) => ({
  type: EDITOR_WIDGET_PLACE,
  payload: {id, type}
})

export const editorWidgetRemove = (id, type) => ({
  type: EDITOR_WIDGET_REMOVE,
  payload: {id, type}
})
