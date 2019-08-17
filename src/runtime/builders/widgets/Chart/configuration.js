import configureStore from '@src/configureStore'
import { configGetAllCharts } from '@reducers'
import update from 'immutability-helper'

import functionalizeTree from '../functionalizeTree'

const processPlotly = (name, configuration) => {
  configuration = functionalizeTree(configuration)

  // we need to unpack 'other' configuration options for dataset, to support configuration options
  // not included in the ui
  let datasets = configuration.datasets
  Object.entries(datasets).forEach(([id]) => {
    const other = new Function(`return ${datasets[id].other}`)()()
    datasets = update(datasets, {
      [id]: { other: { $set: other } }
    })
  })
  return update(configuration, { datasets: { $set: datasets }, })
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