import {
  ADD_WIDGET
} from '@actions/types'

import WidgetType from '@helpers/enum/WidgetType'
import { addWidget, getWidget } from '../commons/widget.js'
import memoize from 'memoize-one'

const type = WidgetType.BUTTON

export default function (state = {}, action) {
  if (action.type === ADD_WIDGET) {
    return addWidget(state, action.payload, type)
  }
  return state
}

export const get = memoize(getWidget)
export const getAll = state => state
