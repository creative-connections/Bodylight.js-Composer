import { SELECT_SCREEN } from '@actions/types'

export const selectScreen = (screen) => {
  return {
    type: SELECT_SCREEN,
    payload: screen
  }
}
