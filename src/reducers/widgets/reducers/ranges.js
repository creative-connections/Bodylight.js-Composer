import {
  ADD_WIDGET,
  RENAME_WIDGET
} from '@actions/types'

import WidgetType from '@helpers/enum/WidgetType'
import { addWidget, getWidget, renameWidget } from '../commons/widget.js'
import memoize from 'memoize-one'

const type = WidgetType.RANGE

export default function (state = {}, action) {
  if (action.type === ADD_WIDGET) {
    return addWidget(state, action.payload, type)
  }
  if (action.type === RENAME_WIDGET) {
    return renameWidget(state, action.payload, type)
  }
  return state
}

export const get = memoize(getWidget)
export const getAll = state => state
