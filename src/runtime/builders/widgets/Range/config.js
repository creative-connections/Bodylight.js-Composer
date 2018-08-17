import configureStore from '@src/configureStore'
import { getConfigForRanges } from '@reducers'

import update from 'immutability-helper'

const functionalize = (configuration, attribute) => {
  let config = configuration[attribute]
  if (config.function !== null) {
    const fn = Function(`return ${config.function}`)()
    config = update(config, {
      function: {$set: fn}
    })
    configuration = update(configuration, {
      [attribute]: {$set: config}
    })
  }
  return configuration
}

const functionalizeAttributes = configuration => {
  configuration.attributes.forEach(attribute => {
    configuration = functionalize(configuration, attribute)
  })
  return configuration
}

export default () => {
  const ranges = getConfigForRanges(configureStore().store.getState())

  const config = {}
  Object.entries(ranges).forEach(([name, configuration]) => {
    configuration = functionalizeAttributes(configuration)
    configuration = functionalize(configuration, 'target')
    config[name] = configuration
  })
  return config
}
