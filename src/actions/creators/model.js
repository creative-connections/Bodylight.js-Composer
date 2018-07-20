import { ADD_MODEL, CNFSCR_SELECT_MODEL } from '@actions/types'

export const addModel = (options, js, modelDescriptionParser) => {
  return {
    type: ADD_MODEL,
    payload: {
      ...options,
      js,
      modelDescriptionParser
    }
  }
}

export const selectModel = (model) => {
  return {
    type: CNFSCR_SELECT_MODEL,
    payload: model
  }
}
