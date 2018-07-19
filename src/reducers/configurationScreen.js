import update from 'immutability-helper'
import { CNFSCR_SELECT_MODEL } from '@actions/types'

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
