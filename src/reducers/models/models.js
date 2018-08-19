import { ADD_MODEL } from '@actions/types'
import update from 'immutability-helper'

import memoize from 'memoize-one'

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_MODEL:
      return update(state, {[action.payload.name]: {$set: action.payload}})
  }
  return state
}

export const getModels = state => state

const getModelsForDropdownMemoized = memoize(
  state => {
    const options = []
    Object.entries(state).forEach(([id, model]) => {
      options.push({
        key: id,
        text: id,
        value: id
      })
    })
    return options
  }
)
export const getModelsForDropdown = state => {
  return getModelsForDropdownMemoized(state)
}
