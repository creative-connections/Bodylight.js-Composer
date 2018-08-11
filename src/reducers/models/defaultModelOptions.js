export default function (state, action) {
  if (state !== undefined) {
    return state
  }
  return {
    mode: 'continuous',
    interval: 50,
    stepSize: 0.05,
    runtoTime: 1
  }
}
