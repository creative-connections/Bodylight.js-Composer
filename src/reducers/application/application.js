import { ANIMATE_SET_FPS, UPDATE_EXPORT_OPTION } from '@actions/types'
import update from 'immutability-helper'
import generateID from '@helpers/generateID'

const generateState = () => {
  return {
    animate: {fps: 24},
    key: generateID(),
    export: {
      name: 'Application',
      performance: false
    }
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
      break
    case UPDATE_EXPORT_OPTION:
      state = update(state, { export: { [action.payload.name]: {$set: action.payload.value} } })
  }
  return state
}

export const getAnimateFps = state => state.animate.fps
export const getApplicationKey = state => state.key
export const getExportOptions = state => state.export
