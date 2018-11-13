import configureStore from '@src/configureStore'
import { configGetAllCharts } from '@reducers'
import update from 'immutability-helper'

import functionalize from '../functionalize'
import processAction from '../processAction'

const processPlotly = (name, configuration) => {
  configuration.attributes.forEach(attribute => {
    configuration = functionalize(configuration, attribute)
  })

  // functionalize datasets
  let datasets = configuration.datasets
  Object.entries(datasets).forEach(([id, dataset]) => {
    datasets = update(datasets, {
      [id]: {$set: functionalize(datasets[id], 'x')}
    })
    datasets = update(datasets, {
      [id]: {$set: functionalize(datasets[id], 'y')}
    })
    datasets = update(datasets, {
      [id]: {$set: functionalize(datasets[id], 'maxSamples')}
    })
    // unpack other
    const other = new Function(`return ${datasets[id].other}`)()()
    datasets = update(datasets, {
      [id]: { other: { $set: other } }
    })
  })

  const shapesHelper = (shapes, id, name) => {
    return update(shapes, {
      [id]: {$set: functionalize(shapes[id], name)}
    })
  }

  // functionalize shapes
  let shapes = configuration.shapes
  Object.entries(shapes).forEach(([id, shape]) => {
    shapes = shapesHelper(shapes, id, 'x0')
    shapes = shapesHelper(shapes, id, 'x1')
    shapes = shapesHelper(shapes, id, 'y0')
    shapes = shapesHelper(shapes, id, 'y1')
    shapes = shapesHelper(shapes, id, 'visible')
    shapes = shapesHelper(shapes, id, 'opacity')
    shapes = shapesHelper(shapes, id, 'layer')
    shapes = shapesHelper(shapes, id, 'color')
    shapes = shapesHelper(shapes, id, 'width')
    shapes = shapesHelper(shapes, id, 'dash')
  })

  configuration = update(configuration, {
    datasets: {$set: datasets},
    shapes: {$set: shapes}
  })

  Object.entries(configuration.actions).forEach(([key, action]) => {
    configuration = update(configuration, { actions: {
      [key]: { $set: processAction(action) } }
    })
  })

  return configuration
}

const processChartjs = (name, configuration) => {
  configuration.attributes.forEach(attribute => {
    configuration = functionalize(configuration, attribute)
  })

  // functionalize datasets
  let datasets = configuration.datasets
  Object.entries(datasets).forEach(([id, dataset]) => {
    datasets = update(datasets, {
      [id]: {$set: functionalize(datasets[id], 'x')}
    })
    datasets = update(datasets, {
      [id]: {$set: functionalize(datasets[id], 'y')}
    })
    datasets = update(datasets, {
      [id]: {$set: functionalize(datasets[id], 'maxSamples')}
    })
    // unpack other
    const other = new Function(`return ${datasets[id].other}`)()()
    datasets = update(datasets, {
      [id]: { other: { $set: other } }
    })
  })

  const shapesHelper = (shapes, id, name) => {
    return update(shapes, {
      [id]: {$set: functionalize(shapes[id], name)}
    })
  }
  configuration = update(configuration, {
    datasets: {$set: datasets}
  })

  Object.entries(configuration.actions).forEach(([key, action]) => {
    configuration = update(configuration, { actions: {
      [key]: { $set: processAction(action) } }
    })
  })

  return configuration
}

export default () => {
  const charts = configGetAllCharts(configureStore().store.getState())
  const config = {}
  Object.entries(charts).forEach(([name, configuration]) => {
    if (configuration.library === 'plotly') {
      config[name] = processPlotly(name, configuration)
      return
    }
    if (configuration.library === 'chartjs') {
      config[name] = processChartjs(name, configuration)
    }
  })
  return config
}
