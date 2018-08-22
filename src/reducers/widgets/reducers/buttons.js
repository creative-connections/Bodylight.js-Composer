import {
  ADD_WIDGET
} from '@actions/types'

import memoize from 'memoize-one'
import WidgetType from '@helpers/enum/WidgetType'
import { addWidget } from '../commons/widget.js'

const type = WidgetType.BUTTON

export default function (state = {}, action) {
  if (action.type === ADD_WIDGET) {
    return addWidget(state, action.payload, type)
  }
  return state
}

export const getButtons = state => state

const getButtonsForTreeMemoized = memoize((state, generateWidgetId) => {
  const buttons = {}
  Object.entries(state).forEach(([key, button]) => {
    buttons[key] = {
      id: button.id,
      name: button.name,
      type: WidgetType.BUTTON
    }
  })
  return buttons
})

export const getButtonsForTree = (state, generateWidgetId) => {
  return getButtonsForTreeMemoized(state, generateWidgetId)
}
