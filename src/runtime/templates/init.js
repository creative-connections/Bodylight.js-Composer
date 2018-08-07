function init (modelDefinitions, modelConfigs, functions, WidgetType, ValueProviderType) {
  var modelNames = Object.keys(modelDefinitions)

  const initModels = () => {
    var promises = []

    modelNames.forEach(modelName => {
      const model = modelDefinitions[modelName]
      const config = modelConfigs[modelName]

      promises.push(modelRuntime(model, config, functions, WidgetType, ValueProviderType))
      // promises.push(modelRuntime(model, config))
    })

    return Promise.all(promises)
  }

  initModels().then((models) => {
    console.log(models)

    const fmi2ModelExchange = 0
    const fmi2CoSimulation = 1

    models.forEach(model => {
      model.bindProviders()

      let fmi2CallbackFunctionsPtr = model.createFmi2CallbackFunctions(model.consoleLoggerPtr)
      console.log(model.consoleLoggerPtr)

      model.inst = model.fmi2Instantiate(
        model.config.name,
        fmi2CoSimulation,
        model.config.guid,
        '',
        fmi2CallbackFunctionsPtr,
        0,
        0 // debug
      )

      model.startTime = 0.0
      model.currentStep = model.startTime
      var status = model.fmi2SetupExperiment(model.inst, 1, 0.000001, model.startTime, 0)
      console.log('setup experiment status: ', status)

      status = model.fmi2EnterInitializationMode(model.inst)
      // model.loadInitialValues()
      // model.attachRanges()
      // model.attachCheckboxes()
      status = model.fmi2ExitInitializationMode(model.inst)

      model.mainloop()
      // mainloopId = window.setInterval(model.mainloop, model.interval, model.precision)
      // tickerUpdate = event => model.tickerUpdate()
      // createjs.Ticker.addEventListener('tick', tickerUpdate)
    })
  })
}

export default init
