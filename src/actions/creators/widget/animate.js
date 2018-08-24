import {
  ADD_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@helpers/enum/WidgetType'

export const addAnimate = (source, animateName, components) => {
  const animateID = generateID()
  const anim = {}
  const text = {}

  components.anim.forEach(name => {
    const id = generateID()
    anim[id] = {
      id,
      name,
      parent: animateID,
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
      parent: animateID,
      type: WidgetType.ANIMATE_TEXT,
      placed: false,
      configured: false
    }
  })

  return {
    type: ADD_WIDGET,
    payload: {
      id: animateID,
      type: WidgetType.ANIMATE,
      name: animateName,
      anim,
      text
    }
  }
}
