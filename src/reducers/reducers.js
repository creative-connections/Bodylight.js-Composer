import { combineReducers } from 'redux'
import models from './models'
import animates from './animates'
import defaultModelOptions from './defaultModelOptions'
import configurationScreen from './configurationScreen'
import activeScreen from './activeScreen'
import selectedWidget from './selectedWidget'
import configAnimateAnim from './configAnimateAnim'
import configAnimateText from './configAnimateText'
import defaultConfigAnimateAnim from './defaultConfigAnimateAnim'
import defaultConfigAnimateText from './defaultConfigAnimateText'

import { NEW_PROJECT } from '@actions/types'

const reducers = combineReducers({
  models,
  animates,
  defaultModelOptions,
  defaultConfigAnimateAnim,
  defaultConfigAnimateText,
  configurationScreen,
  activeScreen,
  selectedWidget,
  configAnimateAnim,
  configAnimateText
})

const stateScrubberReducer = (state, action) => {
  if (action.type === NEW_PROJECT) {
    state = undefined
  }

  return reducers(state, action)
}

export default stateScrubberReducer
