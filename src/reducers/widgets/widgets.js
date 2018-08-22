import { combineReducers } from 'redux'

import animates, * as animatesSelectors from './reducers/animates'
import ranges, * as rangesSelectors from './reducers/ranges'
import buttons, * as buttonsSelectors from './reducers/buttons'
import app, * as appSelectors from './reducers/app'

import memoize from 'memoize-one'

export default combineReducers({
  animates,
  ranges,
  buttons,
  app
})

export const getAnimates = state => animatesSelectors.getAnimates(state.animates)
export const getRanges = state => rangesSelectors.getRanges(state.ranges)
export const getButtons = state => buttonsSelectors.getAll(state.buttons)

export const getAvailableRangeName = (state, root) => rangesSelectors.getAvailableRangeName(state.ranges, root)
export const getAvailableButtonName = (state, root) => buttonsSelectors.getAvailableButtonName(state.buttons, root)

const getWidgetMemoized = memoize((state, id) => {
  let widget = null
  if ((widget = buttonsSelectors.get(state.buttons, id)) !== null) {
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
  const widgets = {animates: {}, ranges: {}}
  widgets.buttons = buttonsSelectors.getAll(state.buttons)
  return widgets
})

export const getWidgetsForTree = state => {
  return getWidgetsForTreeMemoized(state)
}
