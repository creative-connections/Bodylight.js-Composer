import {
  ADD_WIDGET,
  RENAME_BUTTON,
  REMOVE_BUTTON
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@helpers/enum/WidgetType'

export const addButton = () => ({
  type: ADD_WIDGET,
  payload: {
    id: generateID(),
    type: WidgetType.BUTTON
  }
})

export const renameButton = (button, newname) => {
  console.warn('renameButton not implemented yet')
  return {payload: 'nie'}
}

export const removeButton = button => {
  console.warn('removeButton not implemented yet')
  return {payload: 'nie'}
}
