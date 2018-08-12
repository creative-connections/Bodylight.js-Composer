import update from 'immutability-helper'

import {
  ADD_RANGE
} from '@actions/types'

export default function (state = {}, action) {
  if (action.type === ADD_RANGE) {
    const name = action.payload.name
    return update(state, {
      [name]: {$set:
        {name: name}
      }
    })
  }

  return state
}

/**
 * Generates a new available 'unnamed_#' name.
 */
export const getAvailableRangeName = (state) => {
  const root = 'unnamed'
  let counter = 1
  let name = root
  // if the name is already taken we sequentially generate a new one
  while (state[name] !== undefined) {
    name = `${root}_${++counter}`
  }
  return name
}
