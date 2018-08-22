import update from 'immutability-helper'
import WidgetType from '@helpers/enum/WidgetType'

export const addWidget = (state, payload, type, defaultConfig) => {
  if (type !== payload.type) { return state }
  return update(state, { [payload.id]: {$set: defaultConfig} })
}
