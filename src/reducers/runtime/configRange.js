import update from 'immutability-helper'
import {
  CONFIG_RANGE_UPDATE,
  CONFIG_RANGE_REMOVE,
  RENAME_RANGE,
  REMOVE_RANGE
} from '@actions/types'

const defaultConfig = {
  valueProvider: null,
  transform: 'value => value;',
  min: 0,
  max: 100,
  reverse: false,
  initialValue: 0,
  loadInitialValue: true
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

const updateRange = (state, name, config) => {
  return update(state, {
    ranges: {
      [name]: {$set: config}
    }
  })
}

export default function (state = defaultState, action) {
  if (action.type === CONFIG_RANGE_UPDATE) {
    state = updateRange(state, action.payload.range.name, action.payload.config)
  }

  if (action.type === CONFIG_RANGE_REMOVE) {
    state = removeRange(state, action.payload.range.name)
  }

  if (action.type === RENAME_RANGE) {
    const config = state.ranges[action.payload.range.name]
    state = removeRange(state, action.payload.range.name)
    state = updateRange(state, action.payload.newname, config)
  }

  if (action.type === REMOVE_RANGE) {
    return removeRange(state, action.payload.range.name)
  }

  return state
}

export const getConfigForRanges = state => state.ranges
export const getDefaultConfigForRanges = () => defaultConfig
