export default function initWidgets () {
  const promises = []

  promises.push(initAnimateAnimsControlled())
  promises.push(initAnimateTexts())
  promises.push(initRanges())
  promises.push(initButtons())
  promises.push(initToggles())
  promises.push(initCharts())

  return promises
}
