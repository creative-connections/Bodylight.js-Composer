import AnimateAnimMode from '@helpers/AnimateAnimMode'

export default function (state, action) {
  if (state !== undefined) {
    return state
  }
  return {
    valueProvider: null,
    mode: AnimateAnimMode.CONTROLLED,
    transform: 'value => value;',
    min: 0,
    max: 100,
    reverse: false,
    overflow: false,
    initialValue: 0,
    minspeed: 0,
    maxspeed: 1
  }
}
