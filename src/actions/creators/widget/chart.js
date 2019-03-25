import {
  ADD_WIDGET,
  RENAME_WIDGET,
  REMOVE_WIDGET,
  ADD_WIDGET_OPTION,
  REMOVE_WIDGET_OPTION,
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@helpers/enum/WidgetType'

export const addChart = (id) => ({
  type: ADD_WIDGET,
  payload: {
    id: id || generateID(),
    type: WidgetType.CHART
  }
})

export const removeChart = id => ({
  type: REMOVE_WIDGET,
  payload: { type: WidgetType.CHART, id }
})

export const renameChart = (widget, name) => ({
  type: RENAME_WIDGET,
  payload: { widget, name }
})

export const chartAddOption = (widget, option, params = null) => ({
  type: ADD_WIDGET_OPTION,
  payload: { id: generateID(), widget, option, params }
})

export const chartRemoveOption = (widget, option, id, params = null) => ({
  type: REMOVE_WIDGET_OPTION,
  payload: { widget, option, id, params }
})