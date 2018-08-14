/* global initValueProviders */
/* global resolveValueProviders */
/* global initWidgets */

function init () {
  createjs.Ticker.interval = 16.5

  Promise.all([
    Promise.all(initValueProviders()),
    Promise.all(initAnimates())
  ]).then(() => {
    Promise.all([
      initWidgets()
    ]).then(() => {
      resolveValueProviders()
    })
  }
  )
}

export default init
