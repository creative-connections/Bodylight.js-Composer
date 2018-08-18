import update from 'immutability-helper'
import { CONFIG_ANIMATE_ANIM_UPDATE } from '@actions/types'

import AnimateAnimMode from '@helpers/AnimateAnimMode'

const defaultConfig = {
  mode: AnimateAnimMode.CONTROLLED,
  name: null,
  value: {
    value: '',
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

export default function (state = {}, action) {
  if (action.type === CONFIG_ANIMATE_ANIM_UPDATE) {
    const parent = action.payload.parent
    const name = action.payload.name
    const config = action.payload.config

    // check if parent exists, declare as {} if not
    if (state[parent] === undefined) {
      state = update(state, {
        [parent]: {$set: {}}
      })
    }

    return update(state, {
      [parent]: {
        [name]: {$set: config}
      }
    })
  }

  return state
}

export const getConfigForAnimateAnim = state => state
export const getDefaultConfigForAnimateAnim = () => defaultConfig
