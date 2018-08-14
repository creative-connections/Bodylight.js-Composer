import {
  EDITOR_STORAGE_STORE,
  EDITOR_STORAGE_CLEAR,
  EDITOR_PLACE_ANIMATE,
  EDITOR_REMOVE_ANIMATE,
  EDITOR_PLACE_RANGE,
  EDITOR_REMOVE_RANGE
} from '@actions/types'

export const editorStorageStore = data => ({
  type: EDITOR_STORAGE_STORE,
  payload: data
})

export const editorStorageClear = () => ({
  type: EDITOR_STORAGE_CLEAR
})

export const editorPlaceAnimate = name => ({
  type: EDITOR_PLACE_ANIMATE,
  payoad: name
})

export const editorRemoveAnimate = name => ({
  type: EDITOR_REMOVE_ANIMATE,
  payload: name
})

export const editorPlaceRange = name => ({
  type: EDITOR_PLACE_RANGE,
  payload: name
})

export const editorRemoveRange = name => ({
  type: EDITOR_REMOVE_RANGE,
  payload: name
})
