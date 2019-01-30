import AnimateAnimMode from '@helpers/AnimateAnimMode'

export default {
  mode: AnimateAnimMode.CONTROLLED,
  name: null,
  parent: null,
  value: {
    value: 0,
    complex: true,
    provider: null,
    array: false,
    indexes: null,
    'function': null,
    typeof: 'number'
  },

  trigger: {
    value: true,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    'function': null,
    typeof: 'boolean'
  },

  triggerFinish: true,

  min: {
    typeof: 'number',
    value: 0,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    'function': null
  },
  max: {
    typeof: 'number',
    value: 100,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    'function': null
  },
  reversed: {
    typeof: 'boolean',
    value: false,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    'function': null
  },
  overflow: {
    typeof: 'boolean',
    value: false,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    'function': null
  },
  minspeed: {
    typeof: 'number',
    value: 0,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    'function': null
  },
  maxspeed: {
    typeof: 'number',
    value: 10,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    'function': null
  }
}
