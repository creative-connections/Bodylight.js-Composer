import { ADD_MODEL } from '@actions/types'

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
