import update from 'immutability-helper'
import {
  CONFIG_RANGE_UPDATE,
  CONFIG_RANGE_REMOVE,
  RENAME_RANGE,
  REMOVE_RANGE
} from '@actions/types'

const defaultConfig = {
  name: null,

  target: {
    value: null,
    provider: null,
    function: null,
    typeof: 'number'
  },

  attributes: [
    'enabled',
    'min',
    'max',
    'reversed'
  ],

  enabled: {
    typeof: 'boolean',
    value: true,
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
  }

}

const defaultState = {}

const remove = (state, name) => {
  return update(state, {
    $unset: [name]
  })
}

const setConfig = (state, name, config) => {
  return update(state, {
    [name]: {$set: config}
  })
}

const checkUndefined = (state, name) => {
  if (state[name] === undefined) {
    state = update(state, { [name]: {$set: defaultConfig} })
    state = update(state, { [name]: {name: {$set: name}} })
  }
  return state
}

const updateKeyValue = (state, name, key, value) => {
  state = checkUndefined(state, name)
  return update(state, {
    [name]: {[key]: {$set: value}}
  })
}

const updateKeyKeyValue = (state, name, key1, key2, value) => {
  state = checkUndefined(state, name)
  return update(state, {
    [name]: {[key1]: {[key2]: {$set: value}}}
  })
}

export default function (state = defaultState, action) {
  if (action.type === CONFIG_RANGE_UPDATE) {
    const { range, key, value } = action.payload
    const keys = key.split('.')
    if (keys.length === 1) {
      state = updateKeyValue(state, range.name, keys[0], value)
    } else if (keys.length === 2) {
      state = updateKeyKeyValue(state, range.name, keys[0], keys[1], value)

      // setting complex to false, means we have to clean up provider and function
      if (keys[1] === 'complex' && value === false) {
        state = updateKeyKeyValue(state, range.name, keys[0], 'provider', null)
        state = updateKeyKeyValue(state, range.name, keys[0], 'function', null)
      }
    }
    return state
  }

  if (action.type === RENAME_RANGE) {
    const name = action.payload.range.name
    const newname = action.payload.newname
    const config = state[name]

    if (state[newname] !== undefined) {
      return state
    }

    state = remove(state, name)
    state = setConfig(state, newname, config)
    state = updateKeyValue(state, newname, 'name', newname)

    return state
  }

  if (action.type === CONFIG_RANGE_REMOVE) {
    state = remove(state, action.payload.range.name)
  }

  if (action.type === REMOVE_RANGE) {
    return remove(state, action.payload.range.name)
  }

  return state
}

export const getConfigForRanges = state => state
export const getDefaultConfigForRanges = () => defaultConfig
