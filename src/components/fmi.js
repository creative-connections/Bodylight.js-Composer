import {bindable} from 'aurelia-framework';
export class Fmi {
  @bindable fmiName;
  @bindable tolerance;
  @bindable startTime;
  @bindable guid;

  cosimulation=1;

  sReset='fmi2Reset';
  sInstantiate = 'fmi2Instantiate';
  sSetup='fmi2SetupExperiment';
  sEnterinit = 'fmi2EnterInitializationMode';
  sExitinit = 'fmi2ExitInitializationMode';
  sSetreal = 'fmi2SetReal';
  sSetboolean = 'fmi2SetBoolean';
  sGetreal = 'fmi2GetReal';
  sGetboolean = 'fmi2GetBoolean';
  sDostep = 'fmi2DoStep';

  constructor() {}

  attached() {
    let separator = '_';
    let prefix = this.fmiName;
    // OpenModelica exported function names
    if (typeof window._fmi2GetVersion === 'function') {
      prefix = '';
      separator = '';
    }

    this.fmiReset = prefix + '.' + separator + prefix + separator + this.sReset;
    this.fmiInstantiate = prefix + '.' + separator + prefix + separator + this.sInstantiate;
    this.fmiSetup = prefix + '.' + separator + prefix + separator + this.sSetup;
    this.fmiEnterInit = prefix + '.' + separator + prefix + separator + this.sEnterinit;
    this.fmiExitInit = prefix + '.' + separator + prefix + separator + this.sExitinit;
    this.fmiSetReal = prefix + '.' + separator + prefix + separator + this.sSetreal;
    this.fmiGetReal = prefix + '.' + separator + prefix + separator + this.sGetreal;
    this.fmiSetBoolean = prefix + '.' + separator + prefix + separator + this.sSetboolean;
    this.fmiGetBoolean = prefix + '.' + separator + prefix + separator + this.sGetboolean;
    this.fmiDoStep = prefix + '.' + separator + prefix + separator + this.sDostep;
  }

  call(method) {
    window[method]();
  }
  callargs(method, ...args) {
    window[method](args);
  }
  bind() {}

  detached() {}

  consoleLogger(componentEnvironment, instanceName, status, category, message, other) {
    console.log('FMU(' + instanceName +
      ':' + status + ':' +
      category +
      ') msg: ' + message + ' ot:' + other);
  }

  initialize() {
    //initialize
    //window[this.fminame+"."+this.fenterinit]()
    this.call(this.fmiEnterInit);
    //MeursHemodynamics_Model_vanMeursHemodynamicsModel._MeursHemodynamics_Model_vanMeursHemodynamicsModel_fmi2EnterInitializationMode();
    this.call(this.fmiExitInit);
    //MeursHemodynamics_Model_vanMeursHemodynamicsModel._MeursHemodynamics_Model_vanMeursHemodynamicsModel_fmi2ExitInitializationMode();
  }

  restart() {
    // reset and instantiate
    this.call(this.fmiReset);
    //MeursHemodynamics_Model_vanMeursHemodynamicsModel._MeursHemodynamics_Model_vanMeursHemodynamicsModel_fmi2Reset();
    //this.call(this.fmiInstantiate);
    this.callbackptr = window['createFmi2CallbackFunctions'](this.consoleLogger)
    this.inst = window[this.fmiInstantiate](this.fmiName, this.cosimulation, this.guid, '', this.callbackptr, 0, 0);
    //MeursHemodynamics_Model_vanMeursHemodynamicsModel._MeursHemodynamics_Model_vanMeursHemodynamicsModel_fmi2Instantiate();
    // setup experiment
    window[this.fmiSetup](this.inst, 1, this.tolerance || 0.000005, this.startTime, 0);

    //MeursHemodynamics_Model_vanMeursHemodynamicsModel._MeursHemodynamics_Model_vanMeursHemodynamicsModel_fmi2SetupExperiment();
  }

  simulate() {}

  setReal(query, value, count) {
    return window[this.fmiSetReal](this.inst, query.byteOffset, count, value.byteOffset);
  }

  setBoolean(query, value, count) {
    return window[this.fmiSetBoolean](this.inst, query.byteOffset, count, value.byteOffset);
  }

  /**
   * Loads Reals from FMU
   */
  getReal(query, output, count) {
    return window[this.fmiGetReal](this.inst, query.byteOffset, count, output.byteOffset);
  }

  /**
   * Loads Booleans from FMU
   */
  getBoolean(query, output, count) {
    return window[this.fmiGetBoolean](this.inst, query.byteOffset, count, output.byteOffset);
  }

  setRealByName(name, value) {
    //set param
    //window[this.fmiSetReal](name, value);
    //MeursHemodynamics_Model_vanMeursHemodynamicsModel._MeursHemodynamics_Model_vanMeursHemodynamicsModel_fmi2SetReal();
  }

  getRealByName() {
    //get value
    //MeursHemodynamics_Model_vanMeursHemodynamicsModel._MeursHemodynamics_Model_vanMeursHemodynamicsModel_fmi2GetReal();
  }
  stepsimulate() {
    //do step
    //MeursHemodynamics_Model_vanMeursHemodynamicsModel._MeursHemodynamics_Model_vanMeursHemodynamicsModel_fmi2DoStep();
  }
}
