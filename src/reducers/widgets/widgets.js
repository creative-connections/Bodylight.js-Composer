import { combineReducers } from 'redux'

import app, * as appSelectors from './reducers/app'

import buttons, * as buttonsSelectors from './reducers/buttons'
import ranges, * as rangesSelectors from './reducers/ranges'
import models, * as modelsSelectors from './reducers/models'
import animates, * as animatesSelectors from './reducers/animates'
import actions, * as actionsSelectors from './reducers/actions'
import toggles, * as togglesSelectors from './reducers/toggles'
import charts, * as chartsSelectors from './reducers/charts'

import memoize from 'memoize-one'

export default combineReducers({
  buttons,
  ranges,
  models,
  animates,
  actions,
  toggles,
  charts,
  app
})

export const getButtons = state => buttonsSelectors.getAll(state.buttons)
export const getRanges = state => rangesSelectors.getAll(state.ranges)
export const getModels = state => modelsSelectors.getAll(state.models)
export const getAnimates = state => animatesSelectors.getAll(state.animates)
export const getActions = state => actionsSelectors.getAll(state.actions)
export const getToggles = state => togglesSelectors.getAll(state.toggles)
export const getCharts = state => chartsSelectors.getAll(state.charts)

const getWidgetMemoized = memoize((state, id) => {
  let widget = null
  if ((widget = buttonsSelectors.get(state.buttons, id)) !== null) { return widget }
  if ((widget = rangesSelectors.get(state.ranges, id)) !== null) { return widget }
  if ((widget = modelsSelectors.get(state.models, id)) !== null) { return widget }
  if ((widget = animatesSelectors.get(state.animates, id)) !== null) { return widget }
  if ((widget = actionsSelectors.get(state.actions, id)) !== null) { return widget }
  if ((widget = togglesSelectors.get(state.toggles, id)) !== null) { return widget }
  if ((widget = chartsSelectors.get(state.charts, id)) !== null) { return widget }
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
  const widgets = {}
  widgets.buttons = buttonsSelectors.getAll(state.buttons)
  widgets.ranges = rangesSelectors.getAll(state.ranges)
  widgets.models = modelsSelectors.getAll(state.models)
  widgets.animates = animatesSelectors.getAll(state.animates)
  widgets.actions = actionsSelectors.getAll(state.actions)
  widgets.toggles = togglesSelectors.getAll(state.toggles)
  widgets.charts = chartsSelectors.getAll(state.charts)
  return widgets
})

export const getWidgetsForTree = state => {
  return getWidgetsForTreeMemoized(state)
}

export const getModelsForDropdown = state => modelsSelectors.getForDropdown(state.models)
export const getAnimateAnimsForDropdown = state => animatesSelectors.getAnimsForDropdown(state.animates)
export const getAnimateTextsForDropdown = state => animatesSelectors.getTextsForDropdown(state.animates)
export const getButtonsForDropdown = state => buttonsSelectors.getForDropdown(state.buttons)
export const getRangesForDropdown = state => rangesSelectors.getForDropdown(state.ranges)
export const getTogglesForDropdown = state => togglesSelectors.getForDropdown(state.toggles)
export const getChartsForDropdown = state => chartsSelectors.getForDropdown(state.charts)
