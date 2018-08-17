import update from 'immutability-helper'
import {
  CONFIG_ANIMATE_TEXT_UPDATE
} from '@actions/types'

const defaultConfig = {
  name: null,
  attributes: [
    'value',
    'visible'
  ],
  value: {
    value: '',
    complex: false,
    provider: null,
    function: null,
    typeof: 'string'
  },
  visible: {
    value: true,
    complex: false,
    provider: null,
    function: null,
    typeof: 'boolean'
  }
}

/*
  Returns modified state with parent as {} when the parent is not
  defined in the current state.
*/
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
  if (action.type === CONFIG_ANIMATE_TEXT_UPDATE) {
    const { text, key, value } = action.payload
    const keys = key.split('.')
    if (keys.length === 1) {
      state = updateKeyValue(state, text.parent, text.name, keys[0], value)
    } else if (keys.length === 2) {
      state = updateKeyKeyValue(state, text.parent, text.name, keys[0], keys[1], value)

      // setting complex to false, means we have to clean up provider and function
      if (keys[1] === 'complex' && value === false) {
        state = updateKeyKeyValue(state, text.parent, text.name, keys[0], 'provider', null)
        state = updateKeyKeyValue(state, text.parent, text.name, keys[0], 'function', null)
      }
    }
  }
  return state
}

export const getConfigForAnimateText = state => state
export const getDefaultConfigForAnimateText = () => defaultConfig
