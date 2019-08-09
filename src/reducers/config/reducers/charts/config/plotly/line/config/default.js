import axis from './axis'
import margin from './margin'
import legend from './legend'

export default {
  name: 'unnamed',
  library: 'plotly',

  xaxes: [
    { position: 0, name: 'xaxis', axis },
  ],

  yaxes: [
    { position: 0, name: 'yaxis', axis},
  ],

  margin,
  legend,

  fps: 20,

  plot_bgcolor: '#FFFFFF00',
  paper_bgcolor: '#FFFFFF00',

  events: ['change'],
  actions: {},

  annotations: {},
  datasets: {},
  shapes: {},
  images: {},

  enabled: {
    typeof: 'boolean',
    value: true,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    'function': null
  }
}
