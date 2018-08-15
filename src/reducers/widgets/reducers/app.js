import {
  SELECT_WIDGET,
  RENAME_RANGE,
  REMOVE_RANGE,
  ADD_RANGE,
  RENAME_BUTTON,
  REMOVE_BUTTON,
  ADD_BUTTON
} from '@actions/types'
import update from 'immutability-helper'

import WidgetType from '@helpers/WidgetType'
import { generateWidgetId } from '../widgets'

const defaultState = {
  selected: null
}

const selectWidget = (state, id) => {
  return update(state, {
    selected: {$set: id}
  })
}

export default function (state = defaultState, action) {
  if (action.type === SELECT_WIDGET) {
    return selectWidget(state, action.payload.id)
  }

  if (action.type === ADD_RANGE) {
    return selectWidget(state, generateWidgetId(WidgetType.RANGE, action.payload.name))
  }

  if (action.type === RENAME_RANGE) {
    const id = generateWidgetId(WidgetType.RANGE, action.payload.newname)
    return selectWidget(state, id)
  }

  if (action.type === REMOVE_RANGE) {
    return selectWidget(state, null)
  }

  if (action.type === ADD_BUTTON) {
    return selectWidget(state, generateWidgetId(WidgetType.BUTTON, action.payload.name))
  }

  if (action.type === RENAME_BUTTON) {
    const id = generateWidgetId(WidgetType.BUTTON, action.payload.newname)
    return selectWidget(state, id)
  }

  if (action.type === REMOVE_BUTTON) {
    return selectWidget(state, null)
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
