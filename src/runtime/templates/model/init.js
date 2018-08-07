export default function init () {
  const fmi2CoSimulation = 1

  this.bindProviders()

  let fmi2CallbackFunctionsPtr = this.createFmi2CallbackFunctions(this.consoleLoggerPtr)
  console.log(this.consoleLoggerPtr)

  this.inst = this.fmi2Instantiate(
    this.config.name,
    fmi2CoSimulation,
    this.config.guid,
    '',
    fmi2CallbackFunctionsPtr,
    0,
    0 // debug
  )

  this.startTime = 0.0
  this.currentStep = this.startTime
  var status = this.fmi2SetupExperiment(this.inst, 1, 0.000001, this.startTime, 0)
  console.log('setup experiment status: ', status)

  status = this.fmi2EnterInitializationMode(this.inst)
  // this.loadInitialValues()
  // this.attachRanges()
  // this.attachCheckboxes()
  status = this.fmi2ExitInitializationMode(this.inst)

  this.mainloop()
  // mainloopId = window.setInterval(this.mainloop, this.interval, this.precision)
  // tickerUpdate = event => this.tickerUpdate()
  // createjs.Ticker.addEventListener('tick', tickerUpdate)
}
