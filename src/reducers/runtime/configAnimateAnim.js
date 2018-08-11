import update from 'immutability-helper'
import { CONFIG_ANIMATE_ANIM_UPDATE } from '@actions/types'

const defaultState = { }

export default function (state = defaultState, action) {
  if (action.type === CONFIG_ANIMATE_ANIM_UPDATE) {
    const parent = action.payload.parent
    const name = action.payload.name
    const config = action.payload.config

    // check if parent exists, declare as {} if not
    if (state[parent] === undefined) {
      state = update(state, {
        [parent]: {$set: {}}
      })
    }

    return update(state, {
      [parent]: {
        [name]: {$set: config}
      }
    })
  }

  return state
}
