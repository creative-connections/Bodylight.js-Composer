/* global initValueProviders */
/* global resolveValueProviders */
/* global initWidgets */
/* global models */
/* global animateFps */
/* global spinner */
/* global javascript */

function init() {
  createjs.Ticker.framerate = animateFps

  Promise.all([
    Promise.all(initValueProviders()),
    Promise.all(initAnimates())
  ]).then(() => {
    Promise.all([
      initWidgets()
    ]).then(() => {
      resolveValueProviders()
      Object.entries(models).forEach(([, model]) => model.init())

      javascript.onBeforeModelRun.forEach(fn => fn())

      Object.entries(models).forEach(([, model]) => model.play())
      Object.entries(widgets).forEach(([, widget]) => widget.updateComponent())
      spinner.hide()
    })
  })
}

export default init
