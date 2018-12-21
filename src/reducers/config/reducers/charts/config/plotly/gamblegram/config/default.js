import xaxis from './xaxis'
import yaxis from './yaxis'
import margin from './margin'
import legend from './legend'

export default {
  name: 'unnamed',
  library: 'gamblegram',
  xaxis,
  yaxis,
  margin,
  legend,

  events: ['change'],
  actions: {},

  annotations: {},
  columns: {},
  shapes: {},
  images: {},

  bargap: 0,
  barmode: 'relative',

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