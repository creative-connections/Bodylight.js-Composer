import { ADD_MODEL } from '@actions/types'

export const addModel = (options, js, wasm, modelDescriptionParser) => {
  return {
    type: ADD_MODEL,
    payload: {
      name: options.name,
      options,
      js,
      wasm,
      modelDescriptionParser
    }
  }
}
