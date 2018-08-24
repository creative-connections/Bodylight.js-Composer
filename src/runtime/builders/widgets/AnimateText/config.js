import configureStore from '@src/configureStore'
import { configGetAllAnimateTexts } from '@reducers'

import functionalize from '../functionalize'

export default () => {
  const texts = configGetAllAnimateTexts(configureStore().store.getState())

  const config = {}
  Object.entries(texts).forEach(([id, configuration]) => {
    if (config[configuration.parent] === undefined) {
      config[configuration.parent] = { }
    }

    configuration.attributes.forEach(attribute => {
      configuration = functionalize(configuration, attribute)
    })

    config[configuration.parent][id] = configuration
  })

  return config
}
