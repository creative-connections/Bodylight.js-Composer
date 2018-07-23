function init (modelDefs) {
  var modelnames = Object.keys(modelDefs)

  const initModels = () => {
    var promises = []

    modelnames.forEach(modelname => {
      const model = modelDefs[modelname]
      promises.push(modelRuntime(model, {}))
      promises.push(modelRuntime(model, {}))
    })

    return Promise.all(promises)
  }

  initModels().then((models) => {
    console.log(models)
  })
}

export default init
