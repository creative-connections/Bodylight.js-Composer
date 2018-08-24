import {
  ADD_WIDGET
} from '@actions/types'

import WidgetType from '@helpers/enum/WidgetType'
import update from 'immutability-helper'
import memoize from 'memoize-one'

const addAnimate = (state, payload, type) => {
  if (type !== payload.type) { return state }

  const model = {
    id: payload.id,
    name: payload.name,
    type: payload.type,
    placed: true,
    configured: true
  }
  console.log(payload)
}

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_WIDGET:
      return addAnimate(state, payload, type)
  }
  return state
}

export const getAnimates = state => state

const getAnimsForTreeMemoized = memoize((parent, anim, generateWidgetId) => {
  const anims = {}
  Object.entries(anim).forEach(([key, name]) => {
    anims[key] = {
      id: generateWidgetId(WidgetType.ANIMATE_ANIM, name, parent),
      type: WidgetType.ANIMATE_ANIM,
      name: name
    }
  })
  return anims
})

const getTextsForTreeMemoized = memoize((parent, text, generateWidgetId) => {
  const texts = {}
  Object.entries(text).forEach(([key, name]) => {
    texts[key] = {
      id: generateWidgetId(WidgetType.ANIMATE_TEXT, name, parent),
      type: WidgetType.ANIMATE_TEXT,
      name: name
    }
  })
  return texts
})

const getAnimatesForTreeMemoized = memoize((state, generateWidgetId) => {
  const animates = {}
  Object.entries(state).forEach(([key, animate]) => {
    animates[key] = {
      id: generateWidgetId(WidgetType.ANIMATE, animate.name),
      type: WidgetType.ANIMATE,
      name: animate.name
    }
    animates[key].texts = getTextsForTreeMemoized(animate.name, animate.components.text, generateWidgetId)
    animates[key].anims = getAnimsForTreeMemoized(animate.name, animate.components.anim, generateWidgetId)
  })
  return animates
})

export const getAnimatesForTree = (state, generateWidgetId) => {
  return getAnimatesForTreeMemoized(state, generateWidgetId)
}
