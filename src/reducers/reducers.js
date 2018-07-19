import { combineReducers } from 'redux'
import models from './models'
import defaultModelOptions from './defaultModelOptions'
import configurationScreen from './configurationScreen'

const reducers = combineReducers({
  models,
  defaultModelOptions,
  configurationScreen
})

export default reducers
