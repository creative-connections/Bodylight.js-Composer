import { ADD_ANIMATE } from '@actions/types'
import update from 'immutability-helper'

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_ANIMATE:
      return update(state, {[action.payload.name]: {$set: action.payload}})
  }

  return state
}
