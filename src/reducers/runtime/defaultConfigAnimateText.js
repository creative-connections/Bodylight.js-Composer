export default function (state, action) {
  if (state !== undefined) {
    return state
  }
  return {
    valueProvider: null,
    transform: 'value => value;',
    visible: 'value => true;'
  }
}
