import update from 'immutability-helper'
export default function (state) {
  // adds the vertical attribute to ranges

  const vertical = {
    typeof: 'boolean',
    value: false,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    'function': null
  }

  Object.entries(state.config.ranges).forEach(([id]) => {
    state = update(state, {
      config: {
        ranges: {
          [id]: {vertical: {$set: vertical}}
        }
      }
    })
  })

  state = update(state, { version: {$set: '2019-08-05T19:12:12+00:00'} })
  return state
}
