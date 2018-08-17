import { FUNCTION_EDITOR_CONFIG_CHANGE } from '@actions/types'

export const functionEditorConfigChange = (key, value) => {
  return {
    type: FUNCTION_EDITOR_CONFIG_CHANGE,
    payload: {
      key,
      value
    }
  }
}
