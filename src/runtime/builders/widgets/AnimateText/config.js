import configureStore from '@src/configureStore'
import { getConfigForAnimateText } from '@reducers'

import functionalize from '../functionalize'

export default () => {
  const animates = getConfigForAnimateText(configureStore().store.getState())

  const config = {}
  Object.entries(animates).forEach(([animateName, animate]) => {
    config[animateName] = {}
    Object.entries(animate).forEach(([name, configuration]) => {
      configuration.attributes.forEach(attribute => {
        configuration = functionalize(configuration, attribute)
      })
      config[animateName][name] = configuration
    })
  })

  return config
}
