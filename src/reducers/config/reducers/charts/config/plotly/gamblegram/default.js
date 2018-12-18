import xaxis from './xaxis'
import yaxis from './yaxis'

export default {
  name: 'unnamed',
  library: 'gamblegram',
  xaxis,
  yaxis,

  events: ['change'],
  actions: {},

  columns: {},

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