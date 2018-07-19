import { combineReducers } from 'redux'
import models from './models'
import defaultModelOptions from './defaultModelOptions'
import configurationScreen from './configurationScreen'
import activeScreen from './activeScreen'

const reducers = combineReducers({
  models,
  defaultModelOptions,
  configurationScreen,
  activeScreen
})

export default reducers
