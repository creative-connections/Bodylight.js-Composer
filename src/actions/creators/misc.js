import { SELECT_SCREEN, NEW_PROJECT } from '@actions/types'

export const selectScreen = (screen) => {
  return {
    type: SELECT_SCREEN,
    payload: screen
  }
}

export const newProject = () => {
  return {
    type: NEW_PROJECT,
    payload: null
  }
}
