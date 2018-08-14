import configureStore from '@src/configureStore'
import { getConfigForRanges } from '@reducers'

import update from 'immutability-helper'

export default () => {
  const ranges = getConfigForRanges(configureStore().store.getState())

  const config = {}
  Object.entries(ranges).forEach(([name, configuration]) => {
    const transform = Function(`return ${configuration.transform}`)()

    configuration = update(configuration, {
      transform: {$set: transform}
    })

    config[name] = configuration
  })
  return config
}
