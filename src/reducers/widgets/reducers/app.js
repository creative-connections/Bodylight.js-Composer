import { SELECT_WIDGET } from '@actions/types'
import update from 'immutability-helper'

const defaultState = {
  selected: null
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case SELECT_WIDGET:
      return update(state, {
        selected: {$set: action.payload.id}
      })
  }
  return state
}

/**
 * Returns currently selected widget.
 * @return {{id, type, parent, name}}
 */
export const getSelectedWidget = state => {
  if (state.selected === null) {
    return null
  }
  const widget = JSON.parse(state.selected)
  widget.id = state.selected
  return widget
}
