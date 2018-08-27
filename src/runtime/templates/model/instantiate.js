export default function instantiate () {
  const fmi2CoSimulation = 1

  const fmi2CallbackFunctionsPtr = this.createFmi2CallbackFunctions(this.consoleLoggerPtr)

  this.inst = this.fmi2Instantiate(
    this.config.name,
    fmi2CoSimulation,
    this.config.guid,
    '',
    fmi2CallbackFunctionsPtr,
    0,
    0 // debug
  )
}
