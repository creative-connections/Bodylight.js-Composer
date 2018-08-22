import {
  ADD_ANIMATE,
  EDITOR_REMOVE_ANIMATE,
  EDITOR_PLACE_ANIMATE,
  EDITOR_STORAGE_CLEAR
} from '@actions/types'

import WidgetType from '@helpers/enum/WidgetType'
import update from 'immutability-helper'
import memoize from 'memoize-one'

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_ANIMATE:
      state = update(state, {[action.payload.name]: {$set: action.payload}})
      break

    case EDITOR_PLACE_ANIMATE:
      if (state[action.payload] !== undefined) {
        state = update(state, {[action.payload]: {placed: {$set: true}}})
      }
      break

    case EDITOR_REMOVE_ANIMATE:
      if (state[action.payload] !== undefined) {
        state = update(state, {[action.payload]: {$unset: ['placed']}})
      }
      break

    case EDITOR_STORAGE_CLEAR:
      Object.entries(state).forEach(([name, animate]) => {
        state = update(state, {[name]: {$unset: ['placed']}})
      })
      break
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
