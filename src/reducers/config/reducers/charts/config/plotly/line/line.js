import update from 'immutability-helper'
import defaultConfig from './config/default'

import dataset from './config/dataset'
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

  const chart = { ...defaultConfig, ...config }
  chart.datasets = merge(dataset, chart.datasets)
  chart.annotations = merge(annotation, chart.annotations)
  chart.images = merge(image, chart.images)
  chart.shapes = merge(shape, chart.shapes)
  return chart
}