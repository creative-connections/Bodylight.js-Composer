import update from 'immutability-helper'

/**
 * Adds support for multiple axes for PlotlyJS Line.
 *
 * - Move xaxis and yaxis to xaxes and yaxes
 */
export default function (state) {
  Object.entries(state.config.charts).forEach(([id]) => {
    const chart = state.config.charts[id]
    const xaxis = chart.xaxis
    const yaxis = chart.yaxis

    let xaxes = {
      0: { position: 0, name: 'xaxis', axis: null},
      lenght: 1
    }
    let yaxes = {
      0: { position: 0, name: 'yaxis', axis: null},
      length: 1
    }

    xaxes = update(xaxes, { 0: { axis: {$set: xaxis} } })
    yaxes = update(yaxes, { 0: { axis: {$set: yaxis} } })

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
