import {
  ADD_WIDGET,
  RENAME_WIDGET,
  REMOVE_WIDGET,
  UPDATE_WIDGET,
  POPULATE_ANIMATE
} from '@actions/types'

import {
  renameWidget,
  removeWidget
} from '../commons/widget.js'

import WidgetType from '@helpers/enum/WidgetType'
import update from 'immutability-helper'
import memoize from 'memoize-one'

const type = WidgetType.ANIMATE

const populateAnimate = (state, payload) => {
  if (type !== payload.type) { return state }

  return update(state, {
    [payload.id]: {
      name: { $set: payload.name },
      texts: { $set: payload.text },
      anims: { $set: payload.anim },
      populated: { $set: true }
    }
  })
}

const addAnimate = (state, payload) => {
  if (type !== payload.type) { return state }

  const animate = {
    id: payload.id,
    name: 'Empty Animate',
    type: payload.type,
    populated: false,
    anims: {},
    texts: {}
  }

  return update(state, {
    [animate.id]: { $set: animate }
  })
}

const updateAnimate = (state, payload) => {
  if (type !== payload.type) { return state }

  const animate = state[payload.id]

  // add missing anims
  Object.entries(payload.anim).forEach(([, anim]) => {
    let found = false
    Object.entries(animate.anims).forEach(([, current]) => {
      if (current.name === anim.name) {
        found = true
      }
    })
    if (!found) {
      state = update(state, {
        [payload.id]: {
          anims: {
            [anim.id]: { $set: anim }
          }
        }
      })
    }
  })

  // add missing texts
  Object.entries(payload.text).forEach(([, text]) => {
    let found = false
    Object.entries(animate.texts).forEach(([, current]) => {
      if (current.name === text.name) {
        found = true
      }
    })
    if (!found) {
      state = update(state, {
        [payload.id]: {
          texts: {
            [text.id]: { $set: text }
          }
        }
      })
    }
  })

  // remove missing anims
  Object.entries(animate.anims).forEach(([, current]) => {
    let found = false
    Object.entries(payload.anim).forEach(([, anim]) => {
      if (current.name === anim.name) {
        found = true
      }
    })
    if (!found) {
      state = update(state, {
        [payload.id]: { anims: { $unset: [current.id] } }
      })
    }
  })

  // remove missing texts
  Object.entries(animate.texts).forEach(([, current]) => {
    let found = false
    Object.entries(payload.text).forEach(([, text]) => {
      if (current.name === text.name) {
        found = true
      }
    })
    if (!found) {
      state = update(state, {
        [payload.id]: { texts: { $unset: [current.id] } }
      })
    }
  })

  return state
}

export default function (state = {}, action) {
  switch (action.type) {
  case ADD_WIDGET:
    return addAnimate(state, action.payload, type)
  case RENAME_WIDGET:
    return renameWidget(state, action.payload, type)
  case REMOVE_WIDGET:
    return removeWidget(state, action.payload, type)
  case UPDATE_WIDGET:
    return updateAnimate(state, action.payload, type)
  case POPULATE_ANIMATE:
    return populateAnimate(state, action.payload, type)
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
  for (const [, animate] of Object.entries(state)) {
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
  for (const [, animate] of Object.entries(state)) {
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

export const getAnimateWidgetId = (state, idAnimate, name) => {
  if (state[idAnimate] === undefined) {
    return null
  }
  const animate = state[idAnimate]

  for (const [id, anim] of Object.entries(animate.anims)) {
    if (anim.name === name) {
      return id
    }
  }

  for (const [id, text] of Object.entries(animate.texts)) {
    if (text.name === name) {
      return id
    }
  }

  return null
}