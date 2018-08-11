import { combineReducers } from 'redux'

import models from './models/models'
import defaultModelOptions from './models/defaultModelOptions'

import configurationScreen from './app/configurationScreen'
import activeScreen from './app/activeScreen'
import selectedWidget from './app/selectedWidget'
import editorStorage from './app/editorStorage'

import animates from './widgets/animates'
import ranges from './widgets/ranges'

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
  selectedWidget,
  editorStorage,

  animates,
  ranges,

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
