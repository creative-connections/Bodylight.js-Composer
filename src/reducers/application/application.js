import { ANIMATE_SET_FPS } from '@actions/types'
import update from 'immutability-helper'
import generateID from '@helpers/generateID'

const generateState = () => {
  return {
    animate: {fps: 24},
    key: generateID()
  }
}

export default function (state, action) {
  if (!state) {
    state = generateState()
  }

  switch (action.type) {
    case ANIMATE_SET_FPS:
      state = update(state, {
        animate: {fps: {$set: action.payload}}
      })
  }
  return state
}

export const getAnimateFps = state => state.animate.fps
export const getApplicationKey = state => {
  return state.key
}
