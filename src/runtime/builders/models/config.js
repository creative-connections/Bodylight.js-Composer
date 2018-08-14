import configureStore from '@src/configureStore'
import {
  getModels
} from '@reducers'

export default () => {
  const state = configureStore().store.getState()
  const models = getModels(state)

  const config = {}
  Object.entries(models).forEach(([name, model]) => {
    let configuration = {}
    configuration.interval = model.interval
    configuration.stepSize = parseFloat(model.stepSize)
    configuration.guid = model.guid
    configuration.identifier = model.modelIdentifier
    configuration.name = model.name

    config[name] = configuration
  })

  return config
}
