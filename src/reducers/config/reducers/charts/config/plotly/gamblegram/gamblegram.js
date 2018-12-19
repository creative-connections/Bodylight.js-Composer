import update from 'immutability-helper'
import defaultConfig from './config/default'

import annotation from './config/annotation'
import image from './config/image'
import shape from './config/shape'

const merge = (defaultConfig, items) => {
  if (items == null) { return items }
  const out = {}
  Object.entries(items).forEach(([id, config]) => {
    out[id] = { ...defaultConfig, ...config }
  })
  return out
}

export default (config, clear = false) => {
  // On library switch (clear == true) only keep the name from the previous configuration.
  if (clear) {
    return update(defaultConfig, {
      id: { $set: config.id },
      name: { $set: config.name }
    })
  }

  const gamblegram = { ...defaultConfig, ...config }
  gamblegram.annotations = merge(annotation, gamblegram.annotations)
  gamblegram.images = merge(image, gamblegram.images)
  gamblegram.shapes = merge(shape, gamblegram.shapes)
  return gamblegram
}