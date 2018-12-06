import configureStore from '@src/configureStore'
import { configGetAllCharts } from '@reducers'
import update from 'immutability-helper'

import functionalize from '../functionalize'
import functionalizeTree from '../functionalizeTree'
import processAction from '../processAction'

const processPlotly = (name, configuration) => {
  configuration = functionalizeTree(configuration)

  let datasets = configuration.datasets
  Object.entries(datasets).forEach(([id]) => {
    // unpack other
    const other = new Function(`return ${datasets[id].other}`)()()
    datasets = update(datasets, {
      [id]: { other: { $set: other } }
    })
  })

  configuration = update(configuration, {
    datasets: { $set: datasets },
  })

  Object.entries(configuration.actions).forEach(([key, action]) => {
    configuration = update(configuration, {
      actions: {
      [key]: { $set: processAction(action) }
      }
    })
  })

  return configuration
}

const processGamblegram = (name, configuration) => {
  return functionalizeTree(configuration)
}

export default () => {
  const charts = configGetAllCharts(configureStore().store.getState())
  const config = {}
  Object.entries(charts).forEach(([name, configuration]) => {
    switch (configuration.library) {
    case 'plotly':
      config[name] = processPlotly(name, configuration)
      break
    case 'chartjs':
      // TODO: implement chartjs
      break
    case 'gamblegram':
      config[name] = processGamblegram(name, configuration)
      break
    }
  })
  return config
}