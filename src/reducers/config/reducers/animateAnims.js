import {
  UPDATE_WIDGET_CONFIG
} from '@actions/types'

import AnimateAnimMode from '@helpers/AnimateAnimMode'
import WidgetType from '@helpers/enum/WidgetType'
import update from 'immutability-helper'

import { updateWidget } from '../commons/widget'

const defaultConfig = {
  mode: AnimateAnimMode.CONTROLLED,
  name: null,
  parent: null,
  attributes: [
    'value',
    'min',
    'max',
    'reversed',
    'minspeed',
    'maxspeed'
  ],
  value: {
    value: 0,
    complex: false,
    provider: null,
    function: null,
    typeof: 'number'
  },
  min: {
    typeof: 'number',
    value: 0,
    complex: false,
    provider: null,
    function: null
  },
  max: {
    typeof: 'number',
    value: 100,
    complex: false,
    provider: null,
    function: null
  },
  reversed: {
    typeof: 'boolean',
    value: false,
    complex: false,
    provider: null,
    function: null
  },
  overflow: {
    typeof: 'boolean',
    value: false,
    complex: false,
    provider: null,
    function: null
  },
  minspeed: {
    typeof: 'number',
    value: 0,
    complex: false,
    provider: null,
    function: null
  },
  maxspeed: {
    typeof: 'number',
    value: 1,
    complex: false,
    provider: null,
    function: null
  }
}

const type = WidgetType.ANIMATE_ANIM

const addAnimateAnim = (state, payload) => {
  if (type !== payload.widget.type) { return state }
  let config = update(defaultConfig, {
    id: {$set: payload.widget.id},
    name: {$set: payload.widget.name},
    parent: {$set: payload.widget.parent}
  })
  return update(state, { [payload.widget.id]: {$set: config} })
}

const updateAnimateAnim = (state, payload) => {
  if (type !== payload.widget.type) { return state }
  if (state[payload.widget.id] === undefined) {
    state = addAnimateAnim(state, payload)
  }
  state = updateWidget(state, payload, type)
  return state
}

export default function (state = {}, action) {
  switch (action.type) {
    case UPDATE_WIDGET_CONFIG:
      return updateAnimateAnim(state, action.payload)
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
