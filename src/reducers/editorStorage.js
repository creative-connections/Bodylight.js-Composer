import { EDITOR_STORAGE_STORE } from '@actions/types'
import update from 'immutability-helper'

export default function (state = {}, action) {
  switch (action.type) {
    case EDITOR_STORAGE_STORE:
      Object.entries(action.payload).forEach(([key, value]) => {
        state = update(state, {[key]: {$set: value}})
      })
      return state
  }

  return state
}
