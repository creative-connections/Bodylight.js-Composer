export default function cwrapFunctions() {
  this.snprintf = this.cwrap('snprintf', 'number', ['number', 'number', 'number', 'number'])
  this.createFmi2CallbackFunctions = this.cwrap('createFmi2CallbackFunctions', 'number', ['number'])

  // Dymola exported function names
  let prefix = this.config.identifier
  let separator = '_'

  // OpenModelica exported function names
  if (typeof this[`_fmi2GetVersion`] === 'function') {
    prefix = ''
    separator = ''
  }

  this.fmi2GetVersion = this.cwrap(`${prefix}${separator}fmi2GetVersion`, 'string')
  this.fmi2GetTypesPlatform = this.cwrap(`${prefix}${separator}fmi2GetTypesPlatform`, 'string')
  this.fmi2Instantiate = this.cwrap(`${prefix}${separator}fmi2Instantiate`, 'number', ['string', 'number', 'string', 'string', 'number', 'number', 'number'])
  this.fmi2SetupExperiment = this.cwrap(`${prefix}${separator}fmi2SetupExperiment`, 'number', ['number', 'number', 'number', 'number', 'number', 'number'])
  this.fmi2Reset = this.cwrap(`${prefix}${separator}fmi2Reset`, 'number', ['number'])
  this.fmi2FreeInstance = this.cwrap(`${prefix}${separator}fmi2FreeInstance`, 'number', ['number'])
  this.fmi2EnterInitializationMode = this.cwrap(`${prefix}${separator}fmi2EnterInitializationMode`, 'number', ['number'])
  this.fmi2ExitInitializationMode = this.cwrap(`${prefix}${separator}fmi2ExitInitializationMode`, 'number', ['number'])
  this.fmi2GetReal = this.cwrap(`${prefix}${separator}fmi2GetReal`, 'number', ['number', 'number', 'number', 'number'])
  this.fmi2SetReal = this.cwrap(`${prefix}${separator}fmi2SetReal`, 'number', ['number', 'number', 'number', 'number'])
  this.fmi2GetBoolean = this.cwrap(`${prefix}${separator}fmi2GetBoolean`, 'number', ['number', 'number', 'number', 'number'])
  this.fmi2SetBoolean = this.cwrap(`${prefix}${separator}fmi2SetBoolean`, 'number', ['number', 'number', 'number', 'number'])
  this.fmi2DoStep = this.cwrap(`${prefix}${separator}fmi2DoStep`, 'number', ['number', 'number', 'number', 'number'])
}