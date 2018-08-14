import { combineReducers } from 'redux'

import models, * as modelSelectors from './models/models'
import defaultModelOptions from './models/defaultModelOptions'

import configurationScreen from './app/configurationScreen'
import activeScreen from './app/activeScreen'

import editorStorage, * as editorStorageSelectors from './editor/editorStorage'

import widgets, * as widgetSelectors from './widgets'

import configRange, * as configRangeSelectors from './runtime/configRange'

import configAnimateAnim, * as configAnimateAnimSelectors from './runtime/configAnimateAnim'
import configAnimateText, * as configAnimateTextSelectors from './runtime/configAnimateText'
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
  configRange,
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
export const getRanges = state => widgetSelectors.getRanges(state.widgets)

export const getModels = state => modelSelectors.getModels(state.models)

export const getAvailableRangeName = state => widgetSelectors.getAvailableRangeName(state.widgets)
export const getWidgetsForDropdown = state => widgetSelectors.getWidgetsForDropdown(state.widgets)
export const getSelectedWidget = state => widgetSelectors.getSelectedWidget(state.widgets)

export const getConfigForRanges = state => configRangeSelectors.getConfigForRanges(state.configRange)
export const getDefaultConfigForRanges = configRangeSelectors.getDefaultConfigForRanges

export const getConfigForAnimateAnim = state => configAnimateAnimSelectors.getConfigForAnimateAnim(state.configAnimateAnim)
export const getConfigForAnimateText = state => configAnimateTextSelectors.getConfigForAnimateText(state.configAnimateText)

export const getEditorStorage = state => editorStorageSelectors.getEditorStorage(state.editorStorage)
