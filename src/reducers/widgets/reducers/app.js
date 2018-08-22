import {
  ADD_WIDGET,
  SELECT_WIDGET
} from '@actions/types'

import update from 'immutability-helper'

const selectWidget = (state, id) => {
  return update(state, { selected: {$set: id} })
}

const defaultState = {
  selected: null
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case SELECT_WIDGET:
      return selectWidget(state, action.payload.id)
    case ADD_WIDGET:
      return selectWidget(state, action.payload.id)
  }
  return state
}

export const getSelectedWidgetID = state => state.selected
