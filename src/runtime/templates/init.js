/* global initValueProviders */
/* global initWidgets */

function init () {
  createjs.Ticker.interval = 16.5

  let valueProviderPromises = initValueProviders()
  let widgetPromises = initWidgets()

  Promise.all([
    Promise.all(valueProviderPromises),
    Promise.all(widgetPromises)
  ]).then((results) => {
    resolveValueProviders()
  })
}

export default init
