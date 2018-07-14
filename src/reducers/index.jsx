import { combineReducers } from 'redux'
import models from './models'
import defaultModelOptions from './defaultModelOptions'

const rootReducer = combineReducers({
  defaultModelOptions,
  models
})

export default rootReducer
