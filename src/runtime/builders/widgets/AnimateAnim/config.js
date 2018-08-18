import configureStore from '@src/configureStore'
import { getConfigForAnimateAnim } from '@reducers'

import functionalize from '../functionalize'
import AnimateAnimMode from '@helpers/AnimateAnimMode'

export default () => {
  const animates = getConfigForAnimateAnim(configureStore().store.getState())

  const config = {}
  Object.entries(animates).forEach(([animateName, animate]) => {
    config[animateName] = {
      controlled: {}
    }

    Object.entries(animate).forEach(([name, configuration]) => {
      configuration.attributes.forEach(attribute => {
        configuration = functionalize(configuration, attribute)
      })
      if (configuration.mode === AnimateAnimMode.CONTROLLED) {
        config[animateName].controlled[name] = configuration
      }
    })
  })

  return config
}
