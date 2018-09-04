import {
  ADD_WIDGET,
  RENAME_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@helpers/enum/WidgetType'

export const addChart = () => ({
  type: ADD_WIDGET,
  payload: {
    id: generateID(),
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
