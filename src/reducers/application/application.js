import { ANIMATE_SET_FPS } from '@actions/types'
import update from 'immutability-helper'

const defaultState = {
  animate: {
    fps: 24
  }
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case ANIMATE_SET_FPS:
      state = update(state, {
        animate: {fps: {$set: action.payload}}
      })
  }
  return state
}

export const getAnimateFps = state => state.animate.fps
