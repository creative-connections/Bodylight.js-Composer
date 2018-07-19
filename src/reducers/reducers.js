import { combineReducers } from 'redux'
import models from './models'
import defaultModelOptions from './defaultModelOptions'
import configurationScreen from './configurationScreen'
import activeScreen from './activeScreen'

import { NEW_PROJECT } from '@actions/types'

const reducers = combineReducers({
  models,
  defaultModelOptions,
  configurationScreen,
  activeScreen
})

const stateScrubberReducer = (state, action) => {
  if (action.type === NEW_PROJECT) {
    state = undefined
  }

  return reducers(state, action)
}

export default stateScrubberReducer
