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

      model.step = function (precision) {
        var status = model.fmi2DoStep(model.inst, model.currentStep, precision, 1)

        // TODO: proper decimal arithmetic, external library perhaps
        model.currentStep = parseFloat(parseFloat(model.currentStep + precision).toPrecision(8))
        return status
      }

      model.tickerUpdate = function () {
        var values = model.update()
        model.tickAnimations(values)
      }

      model.update = function () {
        model.getRealFromConfig()

        var values = new Float64Array(
          this.config.output.buffer,
          this.config.output.byteOffset,
          this.config.count
        )
        model.updateVariables(values)
        model.updateAnims(values)

        return values
      }

      model.mainloop = function () {
        model.flushSetQueues()
        model.step(model.precision)
        console.log('mainloop 23')
      }

      console.log('MODULE REAAADY')
      resolve(model)
    }).catch(err => {
      reject(err)
    })
  })
}
