import { combineReducers } from 'redux'

import models from './models/models'
import defaultModelOptions from './models/defaultModelOptions'

import configurationScreen from './app/configurationScreen'
import activeScreen from './app/activeScreen'

import editorStorage from './editor/editorStorage'

import widgets, * as widgetSelectors from './widgets'

import configAnimateAnim from './runtime/configAnimateAnim'
import configAnimateText from './runtime/configAnimateText'
import defaultConfigAnimateAnim from './runtime/defaultConfigAnimateAnim'
import defaultConfigAnimateText from './runtime/defaultConfigAnimateText'

import { NEW_PROJECT } from '@actions/types'

const reducers = combineReducers({
  models,
  defaultModelOptions,

  configurationScreen,
  activeScreen,

  editorStorage,

  widgets,

  configAnimateAnim,
  configAnimateText,
  defaultConfigAnimateAnim,
  defaultConfigAnimateText
})

const stateScrubberReducer = (state, action) => {
  if (action.type === NEW_PROJECT) {
    state = undefined
  }
  return reducers(state, action)
}

export default stateScrubberReducer

// export selectors with appropriate states
export const getAnimates = state => widgetSelectors.getAnimates(state.widgets)

export const getAvailableRangeName = (state) => widgetSelectors.getAvailableRangeName(state.widgets)
export const getWidgetsForDropdown = (state) => widgetSelectors.getWidgetsForDropdown(state.widgets)
export const getSelectedWidget = state => widgetSelectors.getSelectedWidget(state.widgets)
