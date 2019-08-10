import update from 'immutability-helper'

/**
 * This fixes a pre-migration hack handling the update of the offset parameter for plotly.
 */
export default function (state) {
  const offset = {
    typeof: 'number',
    value: 0,
    complex: false,
    provider: null,
    'function': 'value => value'
  }

  Object.entries(state.config.charts).forEach(([chartid, chart]) => {
    Object.entries(chart.datasets).forEach(([datasetid, dataset]) => {
      if (dataset.offset == null) {
        state = update(state, {
          config: {
            charts: {
              [chartid]: {
                datasets: {
                  [datasetid]: {
                    offset: { $set: offset }
                  }
                }
              }
            }
          }
        })
      }
    })
  })

  state = update(state, { version: {$set: '2019-08-10T12:21:03+00:00'} })
  return state
}
