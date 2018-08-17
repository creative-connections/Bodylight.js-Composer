import update from 'immutability-helper'
import {
  CONFIG_RANGE_UPDATE,
  CONFIG_RANGE_REMOVE,
  RENAME_RANGE,
  REMOVE_RANGE
} from '@actions/types'

/*
 * AttributeType:
 * 'value'
 */

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

const defaultState = {
  ranges: {}
}

const removeRange = (state, name) => {
  return update(state, {
    ranges: {
      $unset: [name]
    }
  })
}

const setRangeConfig = (state, name, config) => {
  return update(state, {
    ranges: {
      [name]: {$set: config}
    }
  })
}

const checkRangeUndefined = (state, name) => {
  if (state.ranges[name] === undefined) {
    state = update(state, { ranges: { [name]: {$set: defaultConfig} } })
  }
  return state
}

const updateRangeKeyValue = (state, name, key, value) => {
  state = checkRangeUndefined(state, name)
  return update(state, {
    ranges: {
      [name]: {[key]: {$set: value}}
    }
  })
}

const updateRangeKeyKeyValue = (state, name, key1, key2, value) => {
  state = checkRangeUndefined(state, name)
  return update(state, {
    ranges: {
      [name]: {[key1]: {[key2]: {$set: value}}}
    }
  })
}

export default function (state = defaultState, action) {
  if (action.type === CONFIG_RANGE_UPDATE) {
    const { range, key, value } = action.payload
    const keys = key.split('.')
    if (keys.length === 1) {
      state = updateRangeKeyValue(state, range.name, keys[0], value)
    } else if (keys.length === 2) {
      state = updateRangeKeyKeyValue(state, range.name, keys[0], keys[1], value)

      // setting complex to false, means we have to clean up provider and function
      if (keys[1] === 'complex' && value === false) {
        state = updateRangeKeyKeyValue(state, range.name, keys[0], 'provider', null)
        state = updateRangeKeyKeyValue(state, range.name, keys[0], 'function', null)
      }
    }
    return state
  }

  if (action.type === RENAME_RANGE) {
    const name = action.payload.range.name
    const newname = action.payload.newname
    const config = state.ranges[name]

    if (state.ranges[newname] !== undefined) {
      return state
    }

    state = removeRange(state, name)
    state = setRangeConfig(state, newname, config)
    state = updateRangeKeyValue(state, newname, 'name', newname)

    return state
  }

  if (action.type === CONFIG_RANGE_REMOVE) {
    state = removeRange(state, action.payload.range.name)
  }

  if (action.type === REMOVE_RANGE) {
    return removeRange(state, action.payload.range.name)
  }

  return state
}

export const getConfigForRanges = state => state.ranges
export const getDefaultConfigForRanges = () => defaultConfig
