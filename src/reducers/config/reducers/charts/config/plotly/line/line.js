import update from 'immutability-helper'
import defaultConfig from './config/default'

export default (config, clear = false) => {
  // On library switch (clear == true) only keep the name from the previous configuration.
  if (clear) {
    return update(defaultConfig, {
      id: { $set: config.id },
      name: { $set: config.name }
    })
  }
}