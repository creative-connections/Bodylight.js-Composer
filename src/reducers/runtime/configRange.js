import update from 'immutability-helper'
import {
  CONFIG_RANGE_UPDATE,
  CONFIG_RANGE_REMOVE
} from '@actions/types'

const defaultConfig = {
  valueProvider: null,
  transform: 'value => value;',
  min: 0,
  max: 100,
  reverse: false,
  initialValue: 0,
  loadInitialValue: false,
  label: {
    enabled: false,
    location: 'right',
    transform: 'value => value;'
  }
}

const defaultState = {
  ranges: {}
}

export default function (state = defaultState, action) {
  if (action.type === CONFIG_RANGE_UPDATE) {
    console.warn(`${action.type} is not implemented yet`)
    return state
  }

  if (action.type === CONFIG_RANGE_REMOVE) {
    console.warn(`${action.type} is not implemented yet`)
    return state
  }

  return state
}

export const getConfigForRanges = state => state.ranges
export const getDefaultConfigForRanges = () => defaultConfig
