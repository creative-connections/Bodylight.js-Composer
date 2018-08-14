import update from 'immutability-helper'
import {
  CONFIG_ANIMATE_TEXT_UPDATE,
  CONFIG_ANIMATE_TEXT_REMOVE
} from '@actions/types'

/*
  Returns modified state with parent as {} when the parent is not
  defined in the current state.
*/
const checkParent = (state, parent) => {
  if (state[parent] === undefined) {
    return update(state, {
      [parent]: {$set: {}}
    })
  }
  return state
}

const defaultState = { }

export default function (state = defaultState, action) {
  if (action.type === CONFIG_ANIMATE_TEXT_UPDATE) {
    const parent = action.payload.parent
    const name = action.payload.name
    const config = action.payload.config

    state = checkParent(state, parent)

    return update(state, {
      [parent]: {
        [name]: {$set: config}
      }
    })
  }

  if (action.type === CONFIG_ANIMATE_TEXT_REMOVE) {
    const parent = action.payload.parent
    const name = action.payload.name

    state = checkParent(state, parent)

    return update(state, {
      [parent]: {$unset: [name]}
    })
  }

  return state
}

export const getConfigForAnimateText = state => state
