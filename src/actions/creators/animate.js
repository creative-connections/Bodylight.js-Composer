import { ADD_ANIMATE, CNFSCR_SELECT_ANIMATE } from '@actions/types'

export const addAnimate = (source, options) => {
  return {
    type: ADD_ANIMATE,
    payload: {
      source,
      ...options
    }
  }
}

export const selectAnimate = (animate) => {
  return {
    type: CNFSCR_SELECT_ANIMATE,
    payload: animate
  }
}
