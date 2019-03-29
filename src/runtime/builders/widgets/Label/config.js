import configureStore from '@src/configureStore'
import { configGetAllLabels } from '@reducers'

import update from 'immutability-helper'

import functionalize from '../functionalize'
import processAction from '../processAction'

export default () => {
  const labels = configGetAllLabels(configureStore().store.getState())

  const config = {}
  Object.entries(labels).forEach(([name, configuration]) => {
    configuration.attributes.forEach(attribute => {
      configuration = functionalize(configuration, attribute)
    })

    Object.entries(configuration.actions).forEach(([key, action]) => {
      configuration = update(configuration, { actions: {
        [key]: { $set: processAction(action) } }
      })
    })

    config[name] = configuration
  })
  return config
}
