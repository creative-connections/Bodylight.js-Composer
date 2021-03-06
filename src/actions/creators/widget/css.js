import {
  ADD_WIDGET,
  RENAME_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@enum/WidgetType'

export const addCss = () => ({
  type: ADD_WIDGET,
  payload: {
    id: generateID(),
    type: WidgetType.CSS
  }
})

export const renameCss = (css, name) => ({
  type: RENAME_WIDGET,
  payload: {
    widget: css,
    name
  }
})
