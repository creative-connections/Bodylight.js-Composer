import {
  ADD_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@helpers/enum/WidgetType'

export const addModel = (name, js, modelDescription) => {
  return {
    type: ADD_WIDGET,
    payload: {
      id: generateID(),
      type: WidgetType.MODEL,
      js,
      name,
      modelDescription
    }
  }
}
