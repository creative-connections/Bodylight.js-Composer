import xaxis from './xaxis'
import yaxis from './yaxis'
import margin from './margin'

export default {
  name: 'unnamed',
  library: 'plotly',
  xaxis,
  yaxis,
  margin,

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