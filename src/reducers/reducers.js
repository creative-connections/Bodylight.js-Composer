import { combineReducers } from 'redux'

import configurationScreen from './app/configurationScreen'

import functionEditorConfig, * as functionEditorConfigSelectors from './app/functionEditorConfig'
import editorStorage, * as editorStorageSelectors from './editor/editorStorage'

import configAnimateAnim, * as configAnimateAnimSelectors from './config/configAnimateAnim'
import configAnimateText, * as configAnimateTextSelectors from './config/configAnimateText'

import actions, * as actionSelectors from './actions/actions'

import widgets, * as widgetSelectors from './widgets'
import config, * as configSelectors from './config'

import { NEW_PROJECT } from '@actions/types'

const reducers = combineReducers({
  configurationScreen,
  functionEditorConfig,

  editorStorage,

  widgets,
  config,

  configAnimateAnim,
  configAnimateText,

  actions
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

export const getAvailableRangeName = (state, root) => widgetSelectors.getAvailableRangeName(state.widgets, root)

export const getSelectedWidget = state => widgetSelectors.getSelectedWidget(state.widgets)
export const getWidgetsForTree = state => widgetSelectors.getWidgetsForTree(state.widgets)

export const getConfigForAnimateAnim = state => configAnimateAnimSelectors.getConfigForAnimateAnim(state.configAnimateAnim)
export const getDefaultConfigForAnimateAnim = configAnimateAnimSelectors.getDefaultConfigForAnimateAnim
export const getConfigForAnimateText = state => configAnimateTextSelectors.getConfigForAnimateText(state.configAnimateText)
export const getDefaultConfigForAnimateText = configAnimateTextSelectors.getDefaultConfigForAnimateText

export const configGetAllModels = state => configSelectors.configGetAllModels(state.config)
export const configGetModel = (state, id) => configSelectors.configGetModel(state.config, id)
export const configGetAllButtons = state => configSelectors.configGetAllButtons(state.config)
export const configGetButton = (state, id) => configSelectors.configGetButton(state.config, id)
export const configGetAllRanges = state => configSelectors.configGetAllRanges(state.config)
export const configGetRange = (state, id) => configSelectors.configGetRange(state.config, id)

export const getProvidersForDropdown = state => configSelectors.getProvidersForDropdown(state.config)

export const getEditorStorage = state => editorStorageSelectors.getEditorStorage(state.editorStorage)

export const getFunctionEditorConfig = state => functionEditorConfigSelectors.getFunctionEditorConfig(state.functionEditorConfig)

export const getActions = state => actionSelectors.getActions(state.actions)
export const getDefaultForAction = actionSelectors.getDefaultForAction
