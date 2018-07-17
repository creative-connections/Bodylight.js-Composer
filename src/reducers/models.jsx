import { ADD_MODEL } from '@actions/types'
import update from 'immutability-helper'

export default function (state = [], action) {
  switch (action.type) {
    case ADD_MODEL:
      return update(state, {[action.payload.name]: {$set: action.payload}})
  }

  return state
}
