import {
  ADD_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@helpers/enum/WidgetType'

export const addAnimate = (source, name, components) => {
  const anim = {}
  const text = {}

  components.anim.forEach(name => {
    const id = generateID()
    anim[id] = {
      id,
      name,
      type: WidgetType.ANIMATE_ANIM,
      placed: false,
      configured: false
    }
  })

  components.text.forEach(name => {
    const id = generateID()
    text[id] = {
      id,
      name,
      type: WidgetType.ANIMATE_TEXT,
      placed: false,
      configured: false
    }
  })

  return {
    type: ADD_WIDGET,
    payload: {
      id: generateID(),
      type: WidgetType.ANIMATE,
      name,
      anim,
      text
    }
  }
}
