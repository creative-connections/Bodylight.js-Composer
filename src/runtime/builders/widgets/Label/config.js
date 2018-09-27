import configureStore from '@src/configureStore'
import { configGetAllLabels } from '@reducers'

import functionalize from '../functionalize'

export default () => {
  const labels = configGetAllLabels(configureStore().store.getState())

  const config = {}
  Object.entries(labels).forEach(([name, configuration]) => {
    configuration.attributes.forEach(attribute => {
      configuration = functionalize(configuration, attribute)
    })
    config[name] = configuration
  })
  return config
}
