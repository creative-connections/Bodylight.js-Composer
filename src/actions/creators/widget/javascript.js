import {
  ADD_WIDGET,
  RENAME_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@enum/WidgetType'

export const addJavascript = () => ({
  type: ADD_WIDGET,
  payload: {
    id: generateID(),
    type: WidgetType.JAVASCRIPT
  }
})

export const renameJavascript = (javascript, name) => ({
  type: RENAME_WIDGET,
  payload: {
    widget: javascript,
    name
  }
})
