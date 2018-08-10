
import { EDITOR_STORAGE_STORE, EDITOR_STORAGE_CLEAR } from '@actions/types'

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
