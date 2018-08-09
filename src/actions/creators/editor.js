
import { EDITOR_STORAGE_STORE } from '@actions/types'

export const editorStorageStore = (data) => {
  return {
    type: EDITOR_STORAGE_STORE,
    payload: data
  }
}
