import { ADD_RANGE } from '@actions/types'

export const addRange = (name) => {
  return {
    type: ADD_RANGE,
    payload: {name: name}
  }
}
