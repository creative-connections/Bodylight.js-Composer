/* global initValueProviders */
/* global resolveValueProviders */
/* global initWidgets */
/* global models */

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
      Object.entries(models).forEach(([id, model]) => model.init())
      Object.entries(widgets).forEach(([id, widget]) => widget.updateComponent())
    })
  })
}

export default init
