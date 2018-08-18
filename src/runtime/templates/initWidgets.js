export default function initWidgets () {
  const promises = []

  promises.push(initAnimateAnimsControlled())
  promises.push(initAnimateTexts())
  promises.push(initRanges())

  return promises
}
