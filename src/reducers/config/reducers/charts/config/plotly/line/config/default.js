import xaxis from './xaxis'
import yaxis from './yaxis'
import margin from './margin'
import legend from './legend'

export default {
  name: 'unnamed',
  library: 'plotly',
  xaxis,
  yaxis,
  margin,
  legend,

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