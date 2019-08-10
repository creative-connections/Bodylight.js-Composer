import update from 'immutability-helper'

/**
 * Adds xaxis and yaxis to chart's dataset.
 */
export default function (state) {
  const xaxis = 'xaxis'
  const yaxis = 'yaxis'

  Object.entries(state.config.charts).forEach(([chartid, chart]) => {
    Object.entries(chart.datasets).forEach(([datasetid]) => {
      state = update(state, {
        config: {
          charts: {
            [chartid]: {
              datasets: {
                [datasetid]: {
                  xaxis: { $set: xaxis },
                  yaxis: { $set: yaxis },
                }
              }
            }
          }
        }
      })
    })
  })

  state = update(state, { version: {$set: '2019-08-10T19:27:29+00:00'} })
  return state
}
