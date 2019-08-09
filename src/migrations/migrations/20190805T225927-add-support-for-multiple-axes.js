import update from 'immutability-helper'

/**
 * Adds support for multiple axes for PlotlyJS Line.
 *
 * - Move xaxis and yaxis to xaxes and yaxes
 */
export default function (state) {
  Object.entries(state.config.charts).forEach(([id]) => {
    const chart = state.config.charts[id]
    const xaxes = { xaxis: chart.xaxis }
    const yaxes = { yaxis: chart.yaxis }

    state = update(state, {
      config: {
        charts: {
          [id]: {
            $unset: ['xaxis', 'yaxis'],
            xaxes: {$set: xaxes},
            yaxes: {$set: yaxes},
          }
        }
      }
    })
  })

  state = update(state, { version: {$set: '2019-08-05T22:59:27+00:00'} })
  return state
}
