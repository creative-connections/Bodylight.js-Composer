import configureStore from '@src/configureStore'
import { configGetAllModels } from '@reducers'
import update from 'immutability-helper'

export default () => {
  const state = configureStore().store.getState()
  const models = configGetAllModels(state)

  const config = {}
  Object.entries(models).forEach(([id, configuration]) => {
    configuration = update(configuration, {
      stepSize: {$set: parseFloat(configuration.stepSize)},
      startTime: {$set: parseFloat(configuration.startTime)},
      stopTime: {$set: parseFloat(configuration.stopTime)},
      js: {$set: undefined}
    })

    config[id] = configuration
  })

  return config
}
