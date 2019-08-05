import update from 'immutability-helper'

export default function (state) {
  state = update(state, { version: {$set: '2019-08-05T15:13:02+00:00'} })
  return state
}
