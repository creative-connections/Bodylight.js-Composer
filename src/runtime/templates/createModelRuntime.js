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

      model.registerGetId = functions.registerGetId.bind(model)

      // global defines
      model.WidgetType = WidgetType
      model.ValueProviderType = ValueProviderType

      model.lookupProvider = functions.lookupProvider.bind(model)
      model.bindProviders = functions.bindProviders.bind(model)
      model.lookupWidget = functions.lookupWidget.bind(model)
      model.bindWidgets = functions.bindWidgets.bind(model)

      model.modelTick = functions.modelTick.bind(model)
      model.stageTick = functions.stageTick.bind(model)

      model.updateOutputValues = functions.updateOutputValues.bind(model)

      model.updateControlledAnimateAnim = functions.updateControlledAnimateAnim.bind(model)

      console.log('MODULE REAAADY')
      resolve(model)
    }).catch(err => {
      reject(err)
    })
  })
}
