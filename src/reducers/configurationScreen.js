import { CNFSCR_SELECT_MODEL } from '@actions/types'
import update from 'immutability-helper'

const defaultState = {
  selectedModel: null,
  selectedAnimate: null
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case CNFSCR_SELECT_MODEL:
      return update(state, {selectedModel: {$set: action.payload}})
  }

  return state
}
