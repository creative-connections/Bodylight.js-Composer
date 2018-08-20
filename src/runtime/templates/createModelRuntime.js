export default function createModelRuntime (Model, config, functions) {
  return new Promise((resolve, reject) => {
    Model().ready.then(model => {
      // save configuration information about this instance
      model.config = config

      // cwrap functions for their use in this module
      model.cwrapFunctions = functions.cwrapFunctions.bind(model)
      model.cwrapFunctions()

      // bind a consoleLogger instance function
      model.consoleLogger = functions.consoleLogger.bind(model)
      model.consoleLoggerPtr = model.addFunction(
        model.consoleLogger,
        model.config.identifier + '_consoleLogger' // WASM signature
      )

      model.init = functions.init.bind(model)

      model.gettersAndSetters = functions.gettersAndSetters.bind(model)
      model.gettersAndSetters()

      // global defines
      model.WidgetType = WidgetType
      model.ValueProviderType = ValueProviderType

      model.modelTick = functions.modelTick.bind(model)
      model.stageTick = functions.stageTick.bind(model)

      model.updateOutputValues = functions.updateOutputValues.bind(model)

      model.outputValuesIds = []
      model.outputValuesLength = 0
      model.valueListeners = []
      model.initialValueListeners = []

      model.registerValueListener = functions.registerValueListener.bind(model)
      model.registerInitialValueListener = functions.registerInitialValueListener.bind(model)

      model.registerValueSetter = functions.registerValueSetter.bind(model)
      model.setValue = functions.setValue.bind(model)
      model.updateValueListeners = functions.updateValueListeners.bind(model)
      model.updateInitialValueListeners = functions.updateInitialValueListeners.bind(model)

      model.getReferenceFromName = functions.getReferenceFromName.bind(model)

      model.play = functions.play.bind(model)
      model.pause = functions.pause.bind(model)

      console.log(`Module ${model.config.identifier} ready.`)
      resolve(model)
    }).catch(err => {
      reject(err)
    })
  })
}
