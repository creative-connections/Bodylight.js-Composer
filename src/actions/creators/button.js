import {
  ADD_BUTTON,
  RENAME_BUTTON,
  REMOVE_BUTTON
} from '@actions/types'

export const addButton = name => ({
  type: ADD_BUTTON,
  payload: {name: name}
})

export const renameButton = (button, newname) => ({
  type: RENAME_BUTTON,
  payload: { button, newname }
})

export const removeButton = button => ({
  type: REMOVE_BUTTON,
  payload: { button }
})
