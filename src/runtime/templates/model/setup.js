export default function setup () {
  this.currentStep = this.config.startTime
  // TODO: configure precision
  this.fmi2SetupExperiment(this.inst, 1, 0.000001, this.config.startTime, 0)

  this.fmi2EnterInitializationMode(this.inst)

  // TODO: check if setting the values and then getting them suffers the same
  // model stability penalty in the initializationMode.
  this.setInitialValues()
  this.flushSetQueues()
  this.updateInitialValueListeners()

  this.fmi2ExitInitializationMode(this.inst)

  this.updateOutputValues()

  this.modelTickInterval = null
}
