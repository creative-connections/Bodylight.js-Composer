import update from 'immutability-helper'

import {
  ADD_RANGE,
  RENAME_RANGE,
  REMOVE_RANGE
} from '@actions/types'

const removeRange = (state, name) => {
  return update(state, {
    $unset: [name]
  })
}

const addRange = (state, name) => {
  return update(state, {
    [name]: {$set:
      {name: name}
    }
  })
}

export default function (state = {}, action) {
  if (action.type === ADD_RANGE) {
    return addRange(state, action.payload.name)
  }

  if (action.type === RENAME_RANGE) {
    state = removeRange(state, action.payload.range.name)
    return addRange(state, action.payload.newname)
  }

  if (action.type === REMOVE_RANGE) {
    return removeRange(state, action.payload.range.name)
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
