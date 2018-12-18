import update from 'immutability-helper'
import defaultConfig from './default.js'

export default (config, clear = false) => {

  // On library switch (clear == true) only keep the name from the previous configuration.
  if (clear) {
    return update(defaultConfig, { name: { $set: config.name } })
  }
}