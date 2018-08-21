import {
  ADD_BUTTON,
  RENAME_BUTTON,
  REMOVE_BUTTON,
  EDITOR_PLACE_BUTTON,
  EDITOR_REMOVE_BUTTON
} from '@actions/types'

import WidgetType from '@helpers/WidgetType'
import memoize from 'memoize-one'
import update from 'immutability-helper'

const removeButton = (state, name) => {
  return update(state, {
    $unset: [name]
  })
}

const addButton = (state, name) => {
  return update(state, {
    [name]: {$set:
      {name: name}
    }
  })
}

export default function (state = {}, action) {
  if (action.type === ADD_BUTTON) {
    return addButton(state, action.payload.name)
  }

  if (action.type === RENAME_BUTTON) {
    state = removeButton(state, action.payload.button.name)
    return addButton(state, action.payload.newname)
  }

  if (action.type === REMOVE_BUTTON) {
    return removeButton(state, action.payload.button.name)
  }

  if (action.type === EDITOR_PLACE_BUTTON) {
    if (state[action.payload] !== undefined) {
      return update(state, {[action.payload]: {placed: {$set: true}}})
    }
  }

  if (action.type === EDITOR_REMOVE_BUTTON) {
    if (state[action.payload] !== undefined) {
      return update(state, {[action.payload]: {$unset: ['placed']}})
    }
  }

  return state
}

/**
 * Generates a new available 'unnamed_#' name.
 */
export const getAvailableButtonName = (state, root = 'unnamed') => {
  let counter = 1
  let name = root
  // if the name is already taken we sequentially generate a new one
  while (state[name] !== undefined) {
    name = `${root}_${++counter}`
  }
  return name
}

export const getButtons = state => state

const getButtonsForTreeMemoized = memoize((state, generateWidgetId) => {
  const buttons = {}
  Object.entries(state).forEach(([key, button]) => {
    buttons[key] = {
      id: generateWidgetId(WidgetType.BUTTON, button.name),
      type: WidgetType.BUTTON,
      name: button.name
    }
  })
  return buttons
})

export const getButtonsForTree = (state, generateWidgetId) => {
  return getButtonsForTreeMemoized(state, generateWidgetId)
}
