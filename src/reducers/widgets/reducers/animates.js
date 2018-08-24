import { ADD_WIDGET } from '@actions/types'

import WidgetType from '@helpers/enum/WidgetType'
import update from 'immutability-helper'
import memoize from 'memoize-one'

const addAnimate = (state, payload, type) => {
  if (type !== payload.type) { return state }

  const animate = {
    id: payload.id,
    name: payload.name,
    type: payload.type,
    placed: false,
    configured: true,
    anims: payload.anim,
    texts: payload.text
  }

  return update(state, { [animate.id]: {$set: animate} })
}

const type = WidgetType.ANIMATE

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_WIDGET:
      return addAnimate(state, action.payload, type)
  }
  return state
}

export const getAll = state => state

const getMemoized = memoize((state, id) => {
  for (const [animateID, animate] of Object.entries(state)) {
    if (animateID === id) { return animate }
    if (animate.texts[id] !== undefined) { return animate.texts[id] }
    if (animate.anims[id] !== undefined) { return animate.anims[id] }
  }
  return null
})
export const get = getMemoized
