import update from 'immutability-helper'
import { CONFIG_ANIMATE_ANIM_UPDATE } from '@actions/types'

const defaultState = { }

export default function (state = defaultState, action) {
  switch (action.type) {
    case CONFIG_ANIMATE_ANIM_UPDATE:
      console.log('CONFIG_ANIMATE_ANIM_UPDATE', state, action)
      return state
  }

  return state
}
