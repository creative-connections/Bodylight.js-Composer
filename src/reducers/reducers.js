import { combineReducers } from 'redux'

import models, * as modelSelectors from './models/models'
import defaultModelOptions from './models/defaultModelOptions'

import configurationScreen from './app/configurationScreen'
import activeScreen from './app/activeScreen'

import functionEditorConfig, * as functionEditorConfigSelectors from './app/functionEditorConfig'
import editorStorage, * as editorStorageSelectors from './editor/editorStorage'
import widgets, * as widgetSelectors from './widgets'
import configRange, * as configRangeSelectors from './runtime/configRange'
import configAnimateAnim, * as configAnimateAnimSelectors from './runtime/configAnimateAnim'
import configAnimateText, * as configAnimateTextSelectors from './runtime/configAnimateText'

import { NEW_PROJECT } from '@actions/types'

const reducers = combineReducers({
  models,
  defaultModelOptions,

  configurationScreen,
  activeScreen,
  functionEditorConfig,

  editorStorage,

  widgets,

  configAnimateAnim,
  configAnimateText,
  configRange
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
export const getButtons = state => widgetSelectors.getButtons(state.widgets)

export const getModels = state => modelSelectors.getModels(state.models)

export const getAvailableRangeName = (state, root) => widgetSelectors.getAvailableRangeName(state.widgets, root)
export const getAvailableButtonName = state => widgetSelectors.getAvailableButtonName(state.widgets)
export const getWidgetsForDropdown = state => widgetSelectors.getWidgetsForDropdown(state.widgets)
export const getSelectedWidget = state => widgetSelectors.getSelectedWidget(state.widgets)

export const getConfigForRanges = state => configRangeSelectors.getConfigForRanges(state.configRange)
export const getDefaultConfigForRanges = configRangeSelectors.getDefaultConfigForRanges

export const getConfigForAnimateAnim = state => configAnimateAnimSelectors.getConfigForAnimateAnim(state.configAnimateAnim)
export const getDefaultConfigForAnimateAnim = configAnimateAnimSelectors.getDefaultConfigForAnimateAnim
export const getConfigForAnimateText = state => configAnimateTextSelectors.getConfigForAnimateText(state.configAnimateText)
export const getDefaultConfigForAnimateText = configAnimateTextSelectors.getDefaultConfigForAnimateText

export const getEditorStorage = state => editorStorageSelectors.getEditorStorage(state.editorStorage)

export const getFunctionEditorConfig = state => functionEditorConfigSelectors.getFunctionEditorConfig(state.functionEditorConfig)
