import {
  EDITOR_STORAGE_STORE,
  EDITOR_STORAGE_CLEAR,
  EDITOR_PLACE_ANIMATE,
  EDITOR_REMOVE_ANIMATE
} from '@actions/types'

export const editorStorageStore = (data) => {
  return {
    type: EDITOR_STORAGE_STORE,
    payload: data
  }
}

export const editorStorageClear = () => {
  return {
    type: EDITOR_STORAGE_CLEAR
  }
}

export const editorPlaceAnimate = (name) => {
  return {
    type: EDITOR_PLACE_ANIMATE,
    payload: name
  }
}

export const editorRemoveAnimate = (name) => {
  return {
    type: EDITOR_REMOVE_ANIMATE,
    payload: name
  }
}
