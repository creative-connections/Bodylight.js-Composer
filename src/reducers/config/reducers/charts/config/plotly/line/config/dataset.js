export default {
  id: null,
  name: 'dataset',
  mode: 'lines',
  fill: 'none',
  other: '() => ({})',
  offset: {
    typeof: 'number',
    value: 0,
    complex: false,
    provider: null,
    'function': 'value => value'
  },
  line: {
    color: null,
    width: 2,
    shape: 'linear',
    smoothing: 1,
    dash: 'solid',
    simplify: true
  },
  x: {
    typeof: 'number',
    value: 0,
    time: true,
    provider: null,
    array: false,
    indexes: null,
    'function': null
  },
  y: {
    typeof: 'number',
    value: 0,
    time: false,
    provider: null,
    array: false,
    indexes: null,
    'function': null
  },
  maxSamples: {
    typeof: 'number',
    value: -1,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    'function': 'value => value'
  }
}