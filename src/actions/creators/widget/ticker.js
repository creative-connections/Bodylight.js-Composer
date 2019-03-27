import {
  ADD_WIDGET,
  RENAME_WIDGET,
  REMOVE_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@helpers/enum/WidgetType'

export const addTicker = id => ({
  type: ADD_WIDGET,
  payload: {
    id: id || generateID(),
    type: WidgetType.TICKER,
    select: false
  }
})

export const renameTicker = (widget, name) => ({
  type: RENAME_WIDGET,
  payload: { widget, name }
})

export const removeTicker = id => ({
  type: REMOVE_WIDGET,
  payload: {
    id,
    type: WidgetType.TICKER
  }
})
