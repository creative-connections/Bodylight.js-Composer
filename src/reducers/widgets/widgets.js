import { combineReducers } from 'redux'

import models, * as modelsSelectors from './reducers/models'
import animates, * as animatesSelectors from './reducers/animates'
import ranges, * as rangesSelectors from './reducers/ranges'
import buttons, * as buttonsSelectors from './reducers/buttons'
import app, * as appSelectors from './reducers/app'

import memoize from 'memoize-one'

export default combineReducers({
  models,
  animates,
  ranges,
  buttons,
  app
})

export const getModels = state => modelsSelectors.getAll(state.models)
export const getAnimates = state => animatesSelectors.getAnimates(state.animates)
export const getRanges = state => rangesSelectors.getAll(state.ranges)
export const getButtons = state => buttonsSelectors.getAll(state.buttons)

export const getAvailableRangeName = (state, root) => rangesSelectors.getAvailableRangeName(state.ranges, root)

const getWidgetMemoized = memoize((state, id) => {
  let widget = null
  if ((widget = buttonsSelectors.get(state.buttons, id)) !== null) {
    return widget
  }
  if ((widget = rangesSelectors.get(state.ranges, id)) !== null) {
    return widget
  }
  return widget
})

export const getWidget = (state, id) => {
  return getWidgetMemoized(state, id)
}

export const getSelectedWidget = state => {
  const id = appSelectors.getSelectedWidgetID(state.app)
  return getWidget(state, id)
}

const getWidgetsForTreeMemoized = memoize(state => {
  const widgets = {animates: {}}
  widgets.buttons = buttonsSelectors.getAll(state.buttons)
  widgets.ranges = rangesSelectors.getAll(state.ranges)
  return widgets
})

export const getWidgetsForTree = state => {
  return getWidgetsForTreeMemoized(state)
}
