import {bindable} from 'aurelia-framework';
export class Fmi {
  @bindable fminame='N/A';
  @bindable tolerance=0.001;
  @bindable starttime=0;
  @bindable guid='N/A';
  @bindable id;

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
  sCreateCallback='createFmi2CallbackFunctions';

  constructor() {
    //console.log('constructor fminame:', this.fminame);
  }

  attached() {
    this.mydata = [0, 0];
    let separator = '_';
    let prefix = this.fminame;
    //console.log('attached fminame:', this.fminame);
    // OpenModelica exported function names
    if (typeof window._fmi2GetVersion === 'function') {
      prefix = '';
      separator = '';
    }

    //instantiate
    // reset and instantiate
    //this.call(this.fmiReset);
    //MeursHemodynamics_Model_vanMeursHemodynamicsModel._MeursHemodynamics_Model_vanMeursHemodynamicsModel_fmi2Reset();
    //this.call(this.fmiInstantiate);
    //console.log('instantiate, this:', this);
    //console.log('instantiate, this:', this.fmiCreateCallback);
    //create instance
    this.inst = new window[this.fminame];

    //create function methods using emscripten recommended cwrap
    this.fmiCreateCallback = this.inst.cwrap('createFmi2CallbackFunctions', 'number', ['number']);

    this.fmiReset = this.inst.cwrap(prefix + separator + this.sReset, 'number', ['number']);
    this.fmiInstantiate = this.inst.cwrap(prefix + separator + this.sInstantiate, 'number', ['string', 'number', 'string', 'string', 'number', 'number', 'number']);
    this.fmiSetup = this.inst.cwrap(prefix + separator + this.sSetup, 'number', ['number', 'number', 'number', 'number', 'number', 'number']);
    this.fmiEnterInit =  this.inst.cwrap(prefix + separator + this.sEnterinit, 'number', ['number']);
    this.fmiExitInit = this.inst.cwrap(prefix + separator + this.sExitinit, 'number', ['number']);
    this.fmiSetReal = this.inst.cwrap(prefix + separator + this.sSetreal, 'number', ['number', 'number', 'number', 'number']);
    this.fmiGetReal = this.inst.cwrap(prefix + separator + this.sGetreal, 'number', ['number', 'number', 'number', 'number']);
    this.fmiSetBoolean = this.inst.cwrap(prefix + separator + this.sSetboolean, 'number', ['number', 'number', 'number', 'number']);
    this.fmiGetBoolean = this.inst.cwrap(prefix + separator + this.sGetboolean, 'number', ['number', 'number', 'number', 'number']);
    this.fmiDoStep = this.inst.cwrap(prefix + separator + this.sDostep, 'number', ['number', 'number', 'number', 'number']);

    this.fmiGetVersion = this.inst.cwrap(prefix + separator + 'fmi2GetVersion', 'string');
    this.fmiGetTypesPlatform = this.inst.cwrap(prefix + separator + 'fmi2GetTypesPlatform', 'string');
    this.fmi2FreeInstance = this.inst.cwrap(prefix + separator + 'fmi2FreeInstance', 'number', ['number']);
    this.instantiated = false;
    //
    //this.instantiate();
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
    this.fmiEnterInit(this.fmiinst);
    this.fmiExitInit(this.fmiinst);
  }

  instantiate() {
    //console callback ptr
    this.callbackptr = this.fmiCreateCallback(window.console);
    //create instance of model simulation
    this.fmiinst = this.fmiInstantiate(this.fminame, this.cosimulation, this.guid, '', this.callbackptr, 0, 0);
    //setup experiment
    this.fmiSetup(this.fmiinst, 1, this.tolerance, this.starttime, 0);
    console.log('instantiated fmiinst', this.fmiinst);
    this.instantiated = true;
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

  start() {
    if (!this.instantiated) {
      this.instantiate();
      this.initialize();
    }
  }

  stop() {}

  step() {
    if (!this.instantiated) {
      this.instantiate();
      this.initialize();
    }
    //TODO now demo data, get real data from simulation
    //create data
    this.mydata[0]++;
    this.mydata[1] = Math.random();
    //create custom event
    let event = new CustomEvent('fmidata', {detail: this.mydata});
    //dispatch event - it should be listened by some other component
    document.getElementById(this.id).dispatchEvent(event);
    //console.log('step sending data via event',event);
  }

  reset() {}
}
