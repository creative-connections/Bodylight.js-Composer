import {
  UPDATE_WIDGET_CONFIG,
  UPDATE_WIDGET,
  REMOVE_WIDGET,
  LOAD_STORE
} from '@actions/types'
import { REHYDRATE } from 'redux-persist'

import WidgetType from '@enum/WidgetType'
import update from 'immutability-helper'
import {
  removeWidget,
  updateWidgetConfig
} from '../../../widgets/commons/config'

const type = WidgetType.ANIMATE_ANIM
import defaultConfig from './config/default'

const addAnimateAnim = (state, payload) => {
  if (type !== payload.widget.type) { return state }
  let config = update(defaultConfig, {
    id: { $set: payload.widget.id },
    name: { $set: payload.widget.name },
    parent: { $set: payload.widget.parent }
  })
  return update(state, {
    [payload.widget.id]: { $set: config }
  })
}

const updateAnimateAnim = (state, payload) => {
  if (type !== payload.widget.type) { return state }
  if (state[payload.widget.id] === undefined) {
    state = addAnimateAnim(state, payload)
  }
  state = updateWidgetConfig(state, payload, type)
  return state
}

const removeMissingAnimateAnims = (state, payload) => {
  if (WidgetType.ANIMATE !== payload.type) { return state }
  Object.entries(state).forEach(([id, current]) => {
    if (current.parent !== payload.id) {
      return
    }

    let found = false
    Object.entries(payload.anim).forEach(([, anim]) => {
      if (anim.name === current.name) {
        found = true
      }
    })
    if (!found) {
      state = update(state, { $unset: [id] })
    }
  })
  return state
}

const merge = (defaultConfig, items) => {
  if (items == null) { return items }
  return { ...defaultConfig, ...items }
}

const rehydrate = (oldstate, newstate) => {
  /*
   * This is an instead-of-migration fast-forward approach to data model updates. When features
   * are added to the data model, this ensures that project files from previous version of the
   * composer are brought up to date with current default configuration.
   *
   * Missing keys are added and initialized to their default values.
   */
  const animateAnims = {}
  Object.entries(newstate.config.animateAnims).forEach(([id, animateAnim]) => {
    animateAnims[id] = merge(defaultConfig, animateAnim)
  })

  return animateAnims
}

export default function (state = {}, action) {
  switch (action.type) {
  case UPDATE_WIDGET:
    return removeMissingAnimateAnims(state, action.payload)
  case UPDATE_WIDGET_CONFIG:
    return updateAnimateAnim(state, action.payload)
  case REMOVE_WIDGET:
    return removeWidget(state, action.payload, WidgetType.ANIMATE)
  case REHYDRATE:
  case LOAD_STORE:
    if (action != null && action.payload != null) {
      return rehydrate(state, action.payload)
    }
  }
  return state
}

export const getAll = state => state
export const get = (state, id) => {
  if (state[id] === undefined) {
    return defaultConfig
  }
  return state[id]
}
