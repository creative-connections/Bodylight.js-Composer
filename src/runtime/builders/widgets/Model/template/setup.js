export default function setup() {
  this.perf.start(this.config.id, 'initialization')

  this.currentStep = this.config.startTime
  // TODO: configure precision
  this.fmi2SetupExperiment(this.inst, 1, this.config.tolerance || 0.000005, this.config.startTime, 0)

  this.setInitialValues()
  this.flushSetQueues()

  this.fmi2EnterInitializationMode(this.inst)


  this.fmi2ExitInitializationMode(this.inst)

  this.perf.stop(this.config.id, 'initialization')
  
  this.outputValues.update()
  this.updateInitialValueListeners()

  this.modelTickInterval = null

  this.modelIsSetup = true

}
