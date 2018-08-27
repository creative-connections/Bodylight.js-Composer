import {
  ADD_WIDGET,
  RENAME_WIDGET,
  EDITOR_WIDGET_PLACE,
  EDITOR_WIDGET_REMOVE
} from '@actions/types'

import {
  renameWidget,
  setWidgetPlaced
} from '../commons/widget.js'

import WidgetType from '@helpers/enum/WidgetType'
import update from 'immutability-helper'
import memoize from 'memoize-one'

const type = WidgetType.ANIMATE

const addAnimate = (state, payload) => {
  if (type !== payload.type) { return state }

  const animate = {
    id: payload.id,
    name: payload.name,
    type: payload.type,
    placed: false,
    anims: payload.anim,
    texts: payload.text
  }

  return update(state, { [animate.id]: {$set: animate} })
}

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_WIDGET:
      return addAnimate(state, action.payload, type)
    case RENAME_WIDGET:
      return renameWidget(state, action.payload, type)

    case EDITOR_WIDGET_PLACE:
      return setWidgetPlaced(state, action.payload, type, true)
    case EDITOR_WIDGET_REMOVE:
      return setWidgetPlaced(state, action.payload, type, false)
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

const getAnimsForDropdownMemoized = memoize(state => {
  const options = []
  for (const [animateID, animate] of Object.entries(state)) {
    for (const [animID, anim] of Object.entries(animate.anims)) {
      options.push({
        key: animID,
        text: `${animate.name}: ${anim.name}`,
        value: animID
      })
    }
  }
  return options
})
export const getAnimsForDropdown = getAnimsForDropdownMemoized

const getTextsForDropdownMemoized = memoize(state => {
  const options = []
  for (const [animateID, animate] of Object.entries(state)) {
    for (const [textID, text] of Object.entries(animate.texts)) {
      options.push({
        key: textID,
        text: `${animate.name}: ${text.name}`,
        value: textID
      })
    }
  }
  return options
})
export const getTextsForDropdown = getTextsForDropdownMemoized
