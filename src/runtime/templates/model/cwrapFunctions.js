export default function cwrapFunctions () {
  this.snprintf = this.cwrap(
    'snprintf', 'number', [
      'number', 'number', 'number', 'number'
    ]
  )
  this.fmi2GetTypesPlatform = this.cwrap(
    this.config.identifier + '_fmi2GetTypesPlatform',
    'string'
  )
  this.fmi2GetVersion = this.cwrap(
    this.config.identifier + '_fmi2GetVersion',
    'string'
  )
  this.createFmi2CallbackFunctions = this.cwrap(
    'createFmi2CallbackFunctions', 'number', [
      'number'
    ]
  )
  this.fmi2Instantiate = this.cwrap(
    this.config.identifier + '_fmi2Instantiate', 'number', [
      'string',
      'number',
      'string',
      'string',
      'number',
      'number',
      'number'
    ]
  )
  this.fmi2SetupExperiment = this.cwrap(
    this.config.identifier + '_fmi2SetupExperiment', 'number', [
      'number',
      'number',
      'number',
      'number',
      'number',
      'number'
    ]
  )
  this.fmi2EnterInitializationMode = this.cwrap(
    this.config.identifier + '_fmi2EnterInitializationMode', 'number', [
      'number'
    ]
  )
  this.fmi2ExitInitializationMode = this.cwrap(
    this.config.identifier + '_fmi2ExitInitializationMode', 'number', [
      'number'
    ]
  )
  this.fmi2GetReal = this.cwrap(
    this.config.identifier + '_fmi2GetReal', 'number', [
      'number',
      'number',
      'number',
      'number'
    ]
  )
  this.fmi2SetReal = this.cwrap(
    this.config.identifier + '_fmi2SetReal', 'number', [
      'number',
      'number',
      'number',
      'number'
    ]
  )
  this.fmi2GetBoolean = this.cwrap(
    this.config.identifier + '_fmi2GetBoolean', 'number', [
      'number',
      'number',
      'number',
      'number'
    ]
  )
  this.fmi2SetBoolean = this.cwrap(
    this.config.identifier + '_fmi2SetBoolean', 'number', [
      'number',
      'number',
      'number',
      'number'
    ]
  )
  this.fmi2DoStep = this.cwrap(
    this.config.identifier + '_fmi2DoStep', 'number', [
      'number',
      'number',
      'number',
      'number'
    ]
  )
}
