function init (modelDefinitions, modelConfigs, animates, functions) {
  let modelPromises = []
  let animatePromises = []

  let modelNames = Object.keys(modelDefinitions)
  modelNames.forEach(name => {
    const model = modelDefinitions[name]
    const config = modelConfigs[name]
    const promise = createModelRuntime(model, config, functions)
    modelPromises.push(promise)
  })

  Object.entries(animates).forEach(([name, source]) => {
    const promise = createAnimateRuntime(
      name,
      source,
      document.getElementById(name)
    )
    animatePromises.push(promise)
  })

  Promise.all([
    Promise.all(modelPromises),
    Promise.all(animatePromises)
  ]).then((results) => {
    let models = results[0]
    let animates = results[1]

    let widgets = {
      animates: animates.length > 0 ? Object.assign.apply({}, animates) : []
    }

    console.log(widgets)

    models.forEach(model => {
      model.widgets = widgets
      model.init()
    })
  })
}

export default init
