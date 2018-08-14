import configureStore from '@src/configureStore'
import { getConfigForAnimateText } from '@reducers'

import update from 'immutability-helper'

export default () => {
  const animates = getConfigForAnimateText(configureStore().store.getState())

  const config = {}
  Object.entries(animates).forEach(([animateName, animate]) => {
    config[animateName] = {}

    Object.entries(animate).forEach(([name, configuration]) => {
      const transform = Function(`return ${configuration.transform}`)()
      const visible = Function(`return ${configuration.visible}`)()

      configuration = update(configuration, {
        transform: {$set: transform},
        visible: {$set: visible}
      })

      config[animateName][name] = configuration
    })
  })

  return config
}
