import configureStore from '@src/configureStore'
import { configGetAllAnimateAnims } from '@reducers'

import functionalizeTree from '../functionalizeTree'
import floatize from '../floatize'
import AnimateAnimMode from '@helpers/AnimateAnimMode'

export default () => {
  const anims = configGetAllAnimateAnims(configureStore().store.getState())

  const config = {}
  Object.entries(anims).forEach(([id, configuration]) => {
    if (config[configuration.parent] === undefined) {
      config[configuration.parent] = {
        controlled: {},
        continuous: {}
      }
    }

    configuration = functionalizeTree(configuration)

    configuration = floatize(configuration, ['min', 'max', 'maxspeed', 'minspeed'])

    if (configuration.mode === AnimateAnimMode.CONTROLLED) {
      config[configuration.parent].controlled[id] = configuration
    }
    if (configuration.mode === AnimateAnimMode.CONTINUOUS) {
      config[configuration.parent].continuous[id] = configuration
    }
  })

  return config
}
