import { ADD_MODEL, CNFSCR_SELECT_MODEL } from '@actions/types'

export const addModel = (options, js, wasm, modelDescriptionParser) => {
  return {
    type: ADD_MODEL,
    payload: {
      ...options,
      js,
      wasm,
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
