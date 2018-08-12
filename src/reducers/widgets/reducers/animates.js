import {
  ADD_ANIMATE,
  EDITOR_REMOVE_ANIMATE,
  EDITOR_PLACE_ANIMATE,
  EDITOR_STORAGE_CLEAR
} from '@actions/types'

import update from 'immutability-helper'

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_ANIMATE:
      state = update(state, {[action.payload.name]: {$set: action.payload}})
      break

    case EDITOR_PLACE_ANIMATE:
      if (state[action.payload] !== undefined) {
        state = update(state, {[action.payload]: {placed: {$set: true}}})
      }
      break

    case EDITOR_REMOVE_ANIMATE:
      if (state[action.payload] !== undefined) {
        state = update(state, {[action.payload]: {$unset: ['placed']}})
      }
      break

    case EDITOR_STORAGE_CLEAR:
      Object.entries(state).forEach(([name, animate]) => {
        state = update(state, {[name]: {$unset: ['placed']}})
      })
      break
  }

  return state
}

export const getAnimates = state => state
