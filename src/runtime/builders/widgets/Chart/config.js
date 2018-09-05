import configureStore from '@src/configureStore'
import { configGetAllCharts } from '@reducers'
import update from 'immutability-helper'

import functionalize from '../functionalize'
import processAction from '../processAction'

export default () => {
  const charts = configGetAllCharts(configureStore().store.getState())

  const config = {}
  Object.entries(charts).forEach(([name, configuration]) => {
    configuration.attributes.forEach(attribute => {
      configuration = functionalize(configuration, attribute)
    })

    // fucntionalize datasets
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

    configuration = update(configuration, {
      datasets: {$set: datasets}
    })

    Object.entries(configuration.actions).forEach(([key, action]) => {
      configuration = update(configuration, { actions: {
        [key]: { $set: processAction(action) } }
      })
    })

    config[name] = configuration
  })
  return config
}