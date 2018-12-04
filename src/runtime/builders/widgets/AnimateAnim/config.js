import configureStore from '@src/configureStore'
import { configGetAllAnimateAnims } from '@reducers'

import functionalize from '../functionalize'
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

    configuration.attributes.forEach(attribute => {
      configuration = functionalize(configuration, attribute)
    })

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