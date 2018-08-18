import update from 'immutability-helper'
import { CONFIG_ANIMATE_ANIM_UPDATE } from '@actions/types'

import AnimateAnimMode from '@helpers/AnimateAnimMode'

const defaultConfig = {
  mode: AnimateAnimMode.CONTROLLED,
  name: null,
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

const checkParent = (state, parent) => {
  if (state[parent] === undefined) {
    state = update(state, { [parent]: {$set: {}} })
  }
  return state
}

const checkUndefined = (state, parent, name) => {
  state = checkParent(state, parent)
  if (state[parent][name] === undefined) {
    state = update(state, { [parent]: { [name]: {$set: defaultConfig} } })
    state = update(state, { [parent]: { [name]: {name: {$set: name}} } })
  }
  return state
}

const updateKeyValue = (state, parent, name, key, value) => {
  state = checkUndefined(state, parent, name)
  return update(state, {
    [parent]: {
      [name]: {[key]: {$set: value}}
    }
  })
}

const updateKeyKeyValue = (state, parent, name, key1, key2, value) => {
  state = checkUndefined(state, parent, name)
  state = update(state, {
    [parent]: {
      [name]: {[key1]: {[key2]: {$set: value}}}
    }
  })
  return state
}

export default function (state = {}, action) {
  if (action.type === CONFIG_ANIMATE_ANIM_UPDATE) {
    const { anim, key, value } = action.payload
    const keys = key.split('.')
    if (keys.length === 1) {
      state = updateKeyValue(state, anim.parent, anim.name, keys[0], value)
    } else if (keys.length === 2) {
      state = updateKeyKeyValue(state, anim.parent, anim.name, keys[0], keys[1], value)

      // setting complex to false, means we have to clean up provider and function
      if (keys[1] === 'complex' && value === false) {
        state = updateKeyKeyValue(state, anim.parent, anim.name, keys[0], 'provider', null)
        state = updateKeyKeyValue(state, anim.parent, anim.name, keys[0], 'function', null)
      }
    }
  }
  return state
}

export const getConfigForAnimateAnim = state => state
export const getDefaultConfigForAnimateAnim = () => defaultConfig
