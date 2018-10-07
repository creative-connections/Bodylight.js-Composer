import {
  ADD_WIDGET,
  RENAME_WIDGET,
  REMOVE_WIDGET
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

export const renameChart = (chart, name) => ({
  type: RENAME_WIDGET,
  payload: {
    widget: chart,
    name
  }
})

export const removeChart = (id) => ({
  type: REMOVE_WIDGET,
  payload: {
    id,
    type: WidgetType.CHART
  }
})
