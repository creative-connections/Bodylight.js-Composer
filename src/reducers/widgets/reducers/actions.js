import { ADD_WIDGET, RENAME_WIDGET } from '@actions/types'
import { addWidget, getWidget, renameWidget } from '../commons/widget.js'

import WidgetType from '@helpers/enum/WidgetType'
import memoize from 'memoize-one'

const defaultState = {
  'GHH8IZOdQtm49DsQqvYerw': {
    id: 'GHH8IZOdQtm49DsQqvYerw',
    name: 'stopModel',
    type: WidgetType.ACTION
  },
  'V39ogkQlQ3SZIcPVkttVHg': {
    id: 'V39ogkQlQ3SZIcPVkttVHg',
    name: 'startModel',
    type: WidgetType.ACTION
  },
  'TTyO1JbbRmmPTid4aWp9XQ': {
    id: 'TTyO1JbbRmmPTid4aWp9XQ',
    name: 'updateThisWidget',
    type: WidgetType.ACTION
  },
  'H4mja3wsSKWv1xVcK3Hgxg': {
    id: 'H4mja3wsSKWv1xVcK3Hgxg',
    name: 'resetModel',
    type: WidgetType.ACTION
  }
}

const type = WidgetType.ACTION

export default function (state = defaultState, action) {
  switch (action.type) {
    case ADD_WIDGET:
      return addWidget(state, action.payload, type)
    case RENAME_WIDGET:
      return renameWidget(state, action.payload, type)
  }
  return state
}

export const getAll = state => state
export const get = memoize(getWidget)
