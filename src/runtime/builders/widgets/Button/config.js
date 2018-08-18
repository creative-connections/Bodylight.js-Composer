import configureStore from '@src/configureStore'
import { getConfigForButton } from '@reducers'

import functionalize from '../functionalize'

export default () => {
  const ranges = getConfigForButton(configureStore().store.getState())

  const config = {}
  Object.entries(ranges).forEach(([name, configuration]) => {
    configuration.attributes.forEach(attribute => {
      configuration = functionalize(configuration, attribute)
    })
    configuration = functionalize(configuration, 'target')
    config[name] = configuration
  })
  return config
}
