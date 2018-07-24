import { ADD_MODEL, CNFSCR_SELECT_MODEL } from '@actions/types'

export const addModel = (options, js, modelDescription) => {
  return {
    type: ADD_MODEL,
    payload: {
      ...options,
      js,
      ...modelDescription
    }
  }
}

export const selectModel = (model) => {
  return {
    type: CNFSCR_SELECT_MODEL,
    payload: model
  }
}
