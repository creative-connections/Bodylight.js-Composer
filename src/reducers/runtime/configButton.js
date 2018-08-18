import update from 'immutability-helper'
import {
  CONFIG_BUTTON_UPDATE,
  CONFIG_BUTTON_REMOVE,
  RENAME_BUTTON,
  REMOVE_BUTTON
} from '@actions/types'

import ButtonMode from '@helpers/enum/ButtonMode'

const defaultConfig = {
  name: null,
  mode: ButtonMode.CLICK,
  target: {
    value: null,
    provider: null,
    function: null,
    typeof: 'number'
  },

  attributes: [
    'label',
    'enabled',
    'onClick',
    'onPress',
    'onRelease'
  ],

  label: {
    typeof: 'string',
    value: 'button',
    complex: false,
    provider: null,
    function: null
  },

  enabled: {
    typeof: 'boolean',
    value: true,
    complex: false,
    provider: null,
    function: null
  },

  visible: {
    typeof: 'boolean',
    value: true,
    complex: false,
    provider: null,
    function: null
  },

  onClick: {
    typeof: 'number',
    value: 1,
    complex: false,
    provider: null,
    function: null
  },

  onPress: {
    typeof: 'number',
    value: 1,
    complex: false,
    provider: null,
    function: null
  },

  onRelease: {
    typeof: 'number',
    value: 1,
    complex: false,
    provider: null,
    function: null
  }

}

export default function (state = {}, action) {
  return state
}

export const getConfigForButton = state => state
export const getDefaultConfigForButton = () => defaultConfig
