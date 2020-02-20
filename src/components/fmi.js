import {bindable} from 'aurelia-framework';
export class Fmi {
  @bindable fmiName;
  @bindable tolerance;
  @bindable startTime;

  cosimulation=1;

  sReset='fmi2Reset';
  sInstantiate = 'fmi2Instantiate';
  sSetup='fmi2SetupExperiment';
  sEnterinit = 'fmi2EnterInitializationMode';
  sExitinit = 'fmi2ExitInitializationMode';
  sSetreal = 'fmi2SetReal';
  sGetreal = 'fmi2GetReal';
  sDostep = 'fmi2DoStep';

  constructor() {}
  attached() {
    this.fmiReset = this.fmiName + '._' + this.fmiName + '_' + this.sReset;
    this.fmiInstantiate = this.fmiName + '._' + this.fmiName + '_' + this.sInstantiate;
    this.fmiSetup = this.fmiName + '._' + this.fmiName + '_' + this.sSetup;
    this.fmiEnterInit = this.fmiName + '._' + this.fmiName + '_' + this.sEnterinit;
    this.fmiExitInit = this.fmiName + '._' + this.fmiName + '_' + this.sExitinit;
    this.fmiSetReal = this.fmiName + '._' + this.fmiName + '_' + this.sSetreal;
    this.fmiGetReal = this.fmiName + '._' + this.fmiName + '_' + this.sGetreal;
    this.fmiDoStep = this.fmiName + '._' + this.fmiName + '_' + this.sDostep;
  }
  call(method) {
    window[method]();
  }
  callargs(method, ...args) {
    window[method](args);
  }
  bind() {}
  detached() {}
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
    this.inst = window[this.fmiInstantiate](this.name, this.cosimulation, this.guid, '', this.callbackptr, 0, 0);
    //MeursHemodynamics_Model_vanMeursHemodynamicsModel._MeursHemodynamics_Model_vanMeursHemodynamicsModel_fmi2Instantiate();
    // setup experiment
    window[this.fmiSetup](this.inst, 1, this.tolerance || 0.000005, this.startTime, 0);

    //MeursHemodynamics_Model_vanMeursHemodynamicsModel._MeursHemodynamics_Model_vanMeursHemodynamicsModel_fmi2SetupExperiment();
  }
  simulate() {}
//  this.setReal = function (query, value, count) {
//    return this.fmi2SetReal(this.inst, query.byteOffset, count, value.byteOffset)
//  }
  setreal(name, value) {
    //set param
    window[this.fmiSetReal](name, value)
    MeursHemodynamics_Model_vanMeursHemodynamicsModel._MeursHemodynamics_Model_vanMeursHemodynamicsModel_fmi2SetReal();
  }

  getreal() {
    //get value
    MeursHemodynamics_Model_vanMeursHemodynamicsModel._MeursHemodynamics_Model_vanMeursHemodynamicsModel_fmi2GetReal();
  }
  stepsimulate() {
    //do step
    MeursHemodynamics_Model_vanMeursHemodynamicsModel._MeursHemodynamics_Model_vanMeursHemodynamicsModel_fmi2DoStep();
  }
}
