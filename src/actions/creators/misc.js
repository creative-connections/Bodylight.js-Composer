import { SELECT_SCREEN, NEW_PROJECT, SELECT_WIDGET } from '@actions/types'

export const selectScreen = (screen) => {
  return {
    type: SELECT_SCREEN,
    payload: screen
  }
}

export const selectWidget = widget => {
  return {
    type: SELECT_WIDGET,
    payload: widget
  }
}

export const newProject = () => {
  return {
    type: NEW_PROJECT,
    payload: null
  }
}
