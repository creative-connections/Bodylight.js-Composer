function init (modelDefinitions, modelConfigs, animates, functions) {
  createjs.Ticker.interval = 16.5
  let modelPromises = []
  let animatePromises = []

  // create promises for all modules
  let modelNames = Object.keys(modelDefinitions)
  modelNames.forEach(name => {
    const model = modelDefinitions[name]
    const config = modelConfigs[name]
    const promise = createModelRuntime(model, config, functions)
    modelPromises.push(promise)
  })

  // create promises for all animates
  Object.entries(animates).forEach(([name, source]) => {
    const promise = createAnimateRuntime(
      name,
      source,
      document.getElementById(name)
    )
    animatePromises.push(promise)
  })

  // init everything simultaneously
  Promise.all([
    Promise.all(modelPromises),
    Promise.all(animatePromises)
  ]).then((results) => {
    let models = results[0]
    let animates = results[1]

    let widgets = {
      animates: animates.length > 0 ? Object.assign.apply({}, animates) : []
    }

    models.forEach(model => {
      model.widgets = widgets
      model.init()
    })
  })
}

export default init
