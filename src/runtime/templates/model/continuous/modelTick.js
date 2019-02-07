export default function modelTick() {
  this.updateValueListeners(true)

  this.perf.start(this.config.id, 'tick')

  this.flushSetQueues()
  const result = this.fmi2DoStep(this.inst, this.currentStep, this.config.stepSize, 1)

  if (result === 2 || result === 1) {
    this.reset(true, true)
    return
  }

  // TODO: proper decimal arithmetic, external library perhaps
  this.currentStep = parseFloat(parseFloat(this.currentStep + this.config.stepSize).toPrecision(8))
  this.outputValues.update()

  this.perf.stop(this.config.id, 'tick')
}
