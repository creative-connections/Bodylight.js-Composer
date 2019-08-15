import configureStore from '@src/configureStore'
import { configGetAllButtons } from '@reducers'
import update from 'immutability-helper'

import functionalize from '../functionalize'
import processAction from '../processAction'

export default () => {
  const buttons = configGetAllButtons(configureStore().store.getState())

  const config = {}
  Object.entries(buttons).forEach(([name, configuration]) => {
    configuration.attributes.forEach(attribute => {
      configuration = functionalize(configuration, attribute)
    })

    Object.entries(configuration.actions).forEach(([key, action]) => {
      configuration = update(configuration, { actions: {
        [key]: { $set: processAction(action) } }
      })
    })

    configuration = functionalize(configuration, 'target')
    config[name] = configuration
  })
  return config
}
