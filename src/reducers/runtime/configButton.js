import update from 'immutability-helper'
import {
  CONFIG_BUTTON_UPDATE,
  CONFIG_BUTTON_REMOVE,
  RENAME_BUTTON,
  REMOVE_BUTTON
} from '@actions/types'

const defaultConfig = {
  name: null
}

export default function (state = {}, action) {
  return state
}

export const getConfigForButton = state => state
export const getDefaultConfigForButton = () => defaultConfig
