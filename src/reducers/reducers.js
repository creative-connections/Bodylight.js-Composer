import { combineReducers } from 'redux'

import configurationScreen from './app/configurationScreen'
import name, * as nameSelectors from './app/name'

import functionEditorConfig, * as functionEditorConfigSelectors from './app/functionEditorConfig'
import editorStorage, * as editorStorageSelectors from './editor/editorStorage'

import widgets, * as widgetSelectors from './widgets'
import config, * as configSelectors from './config'

import application, * as applicationSelectors from './application'

import { NEW_PROJECT } from '@actions/types'

const reducers = combineReducers({
  name,
  configurationScreen,
  functionEditorConfig,
  application,

  editorStorage,

  widgets,
  config
})

const stateScrubberReducer = (state, action) => {
  if (action.type === NEW_PROJECT) {
    state = undefined
  }
  return reducers(state, action)
}

export default stateScrubberReducer

export const getProjectName = state => nameSelectors.getProjectName(state.name)

// export selectors with appropriate states
export const getAnimates = state => widgetSelectors.getAnimates(state.widgets)
export const getModels = state => widgetSelectors.getModels(state.widgets)
export const getRanges = state => widgetSelectors.getRanges(state.widgets)
export const getButtons = state => widgetSelectors.getButtons(state.widgets)
export const getActions = state => widgetSelectors.getActions(state.widgets)
export const getToggles = state => widgetSelectors.getToggles(state.widgets)
export const getCharts = state => widgetSelectors.getCharts(state.widgets)
export const getLabels = state => widgetSelectors.getLabels(state.widgets)

export const getSelectedWidget = state => widgetSelectors.getSelectedWidget(state.widgets)
export const getWidgetsForTree = state => widgetSelectors.getWidgetsForTree(state.widgets)

export const configGetAllModels = state => configSelectors.configGetAllModels(state.config)
export const configGetModel = (state, id) => configSelectors.configGetModel(state.config, id)
export const configGetAllButtons = state => configSelectors.configGetAllButtons(state.config)
export const configGetButton = (state, id) => configSelectors.configGetButton(state.config, id)
export const configGetAllRanges = state => configSelectors.configGetAllRanges(state.config)
export const configGetRange = (state, id) => configSelectors.configGetRange(state.config, id)
export const configGetAllAnimates = state => configSelectors.configGetAllAnimates(state.config)
export const configGetAnimate = (state, id) => configSelectors.configGetAnimate(state.config, id)
export const configGetAllAnimateTexts = state => configSelectors.configGetAllAnimateTexts(state.config)
export const configGetAnimateText = (state, id) => configSelectors.configGetAnimateText(state.config, id)
export const configGetAllAnimateAnims = state => configSelectors.configGetAllAnimateAnims(state.config)
export const configGetAnimateAnim = (state, id) => configSelectors.configGetAnimateAnim(state.config, id)
export const configGetAllActions = state => configSelectors.configGetAllActions(state.config)
export const configGetAction = (state, id) => configSelectors.configGetAction(state.config, id)
export const configGetAllToggles = state => configSelectors.configGetAllToggles(state.config)
export const configGetToggle = (state, id) => configSelectors.configGetToggle(state.config, id)
export const configGetAllCharts = state => configSelectors.configGetAllCharts(state.config)
export const configGetChart = (state, id) => configSelectors.configGetChart(state.config, id)
export const configGetAllLabels = state => configSelectors.configGetAllLabels(state.config)
export const configGetLabel = (state, id) => configSelectors.configGetLabel(state.config, id)

export const getProvidersForDropdown = state => configSelectors.getProvidersForDropdown(state.config)
export const getArrayProvidersFromProvider = (state, provider) => configSelectors.getArrayProvidersFromProvider(state.config, provider)

export const getEditorStorage = state => editorStorageSelectors.getEditorStorage(state.editorStorage)

export const getFunctionEditorConfig = state => functionEditorConfigSelectors.getFunctionEditorConfig(state.functionEditorConfig)

export const getModelsForDropdown = state => widgetSelectors.getModelsForDropdown(state.widgets)
export const getAnimateAnimsForDropdown = state => widgetSelectors.getAnimateAnimsForDropdown(state.widgets)
export const getAnimateTextsForDropdown = state => widgetSelectors.getAnimateTextsForDropdown(state.widgets)
export const getButtonsForDropdown = state => widgetSelectors.getButtonsForDropdown(state.widgets)
export const getRangesForDropdown = state => widgetSelectors.getRangesForDropdown(state.widgets)
export const getTogglesForDropdown = state => widgetSelectors.getTogglesForDropdown(state.widgets)
export const getChartsForDropdown = state => widgetSelectors.getChartsForDropdown(state.widgets)
export const getLabelsForDropdown = state => widgetSelectors.getLabelsForDropdown(state.widgets)

// application configuration
export const getAnimateFps = state => applicationSelectors.getAnimateFps(state.application)
export const getApplicationKey = state => applicationSelectors.getApplicationKey(state.application)
export const getExportOptions = state => applicationSelectors.getExportOptions(state.application)
