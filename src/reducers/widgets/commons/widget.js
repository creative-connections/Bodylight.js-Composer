import update from 'immutability-helper'
import WidgetType from '@helpers/enum/WidgetType'

export const addWidget = (state, payload, type) => {
  if (type !== payload.type) { return state }

  const widget = {
    id: payload.id,
    name: 'unnamed',
    placed: false,
    configured: true
  }

  return update(state, { [payload.id]: {$set: widget} })
}
