import {
  ADD_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@helpers/enum/WidgetType'

export const addAnimate = (source, name, components) => ({
  type: ADD_WIDGET,
  payload: {
    id: generateID(),
    type: WidgetType.ANIMATE,
    name: name,
    components
  }
})
