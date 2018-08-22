import { combineReducers } from 'redux'
import WidgetType from '@helpers/enum/WidgetType'

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
export const getButtons = state => buttonsSelectors.getButtons(state.buttons)

export const getAvailableRangeName = (state, root) => rangesSelectors.getAvailableRangeName(state.ranges, root)
export const getAvailableButtonName = (state, root) => buttonsSelectors.getAvailableButtonName(state.buttons, root)

export const getSelectedWidget = state => appSelectors.getSelectedWidget(state.app)

export const generateWidgetId = (type, name, parent = null) => {
  /*
   * Since JSON.stringify does not guarantee any particular order, we have to
   * create our own stringification. We only rely on it for string escapement.
   */
  let output = '{'
  output += `"type":${JSON.stringify(type)}`
  output += `,"name":${JSON.stringify(name)}`
  // some widgets do not require a parent (e.g. ranges)
  if (parent !== null) {
    output += `,"parent":${JSON.stringify(parent)}`
  }
  output += `}`

  return output
}

const getWidgetsForTreeMemoized = memoize(state => {
  const widgets = {}
  widgets.animates = animatesSelectors.getAnimatesForTree(state.animates, generateWidgetId)
  widgets.buttons = buttonsSelectors.getButtonsForTree(state.buttons, generateWidgetId)
  widgets.ranges = rangesSelectors.getRangesForTree(state.ranges, generateWidgetId)
  return widgets
})

export const getWidgetsForTree = state => {
  return getWidgetsForTreeMemoized(state)
}
