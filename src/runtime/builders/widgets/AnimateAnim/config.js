import configureStore from '@src/configureStore'
import { getConfigForAnimateAnim } from '@reducers'

import update from 'immutability-helper'

import AnimateAnimMode from '@helpers/AnimateAnimMode'

export default () => {
  const animates = getConfigForAnimateAnim(configureStore().store.getState())

  const config = {}

  Object.entries(animates).forEach(([animateName, animate]) => {
    config[animateName] = {
      controlled: {}
    }

    Object.entries(animate).forEach(([animName, configuration]) => {
      const transform = Function(`return ${configuration.transform}`)()
      configuration = update(configuration, {
        transform: {$set: transform}
      })

      if (configuration.mode === AnimateAnimMode.CONTROLLED) {
        config[animateName].controlled[animName] = configuration
      }
    })
  })

  return config
}
