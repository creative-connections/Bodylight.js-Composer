export default function modelTick () {
  this.perf.start(this.config.id, 'tick')

  this.flushSetQueues()
  this.fmi2DoStep(this.inst, this.currentStep, this.config.stepSize, 1)
  // TODO: proper decimal arithmetic, external library perhaps
  this.currentStep = parseFloat(parseFloat(this.currentStep + this.config.stepSize).toPrecision(8))
  this.updated = true

  this.perf.stop(this.config.id, 'tick')
}
