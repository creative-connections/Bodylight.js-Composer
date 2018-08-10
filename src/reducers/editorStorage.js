import { EDITOR_STORAGE_STORE, EDITOR_STORAGE_CLEAR } from '@actions/types'
import update from 'immutability-helper'

const defaultState = {}

export default function (state = defaultState, action) {
  switch (action.type) {
    case EDITOR_STORAGE_STORE:
      Object.entries(action.payload).forEach(([key, value]) => {
        state = update(state, {[key]: {$set: value}})
      })
      return state
    case EDITOR_STORAGE_CLEAR:
      return defaultState
  }

  return state
}
