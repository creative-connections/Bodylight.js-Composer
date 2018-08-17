import update from 'immutability-helper'
import { FUNCTION_EDITOR_CONFIG_CHANGE } from '@actions/types'

const defaultState = {
  mode: 'javascript',
  theme: 'tomorrow',
  fontSize: '1em',
  height: '12em',
  keyboardHandler: 'default'
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case FUNCTION_EDITOR_CONFIG_CHANGE:
      state = update(state, {
        [action.payload.key]: {$set: action.payload.value}
      })
  }

  return state
}

export const getFunctionEditorConfig = state => state
