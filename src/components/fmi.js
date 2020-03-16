import {bindable} from 'aurelia-framework';
export class Fmi {
  @bindable fminame='N/A';
  @bindable tolerance=0.001;//0.000030517578
  @bindable starttime=0;
  @bindable guid='N/A';
  @bindable id;
  @bindable valuereferences='';


  cosimulation=1;
  stepSize=0.01;//0.0078125;


  doingstep=false;
  animationstarted=false;
  measurefps=true;
  fpstick=0;
  stepi=0;

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
    //split references by ,
    this.references = this.valuereferences.split(',');
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

    //console.log('instantiate, this:', this.fmiCreateCallback);
    //create instance
    this.inst = new window[this.fminame];
    console.log('instantiate, this.inst', this.inst);
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
  /**
   * Implements a rudimentary browser console logger for the FMU.
   */
  consoleLogger(componentEnvironment, instanceName, status, category, message, other) {
    /* Fills variables into message returned by the FMU, the C way */
    const formatMessage = (message1, other1) => {
      // get a new pointer
      let ptr = this.inst._malloc(1);
      // get the size of the resulting formated message
      let num = this.inst._snprintf(ptr, 0, message1, other1);
      this.inst._free(ptr);
      num++; // TODO: Error handling num < 0
      ptr = this.inst._malloc(num);
      this.inst._snprintf(ptr, num, message1, other1);

      // return pointer to the resulting message string
      return ptr;
    };

    console.log('FMU(' + this.inst.UTF8ToString(instanceName) +
      ':' + status + ':' +
      this.inst.UTF8ToString(category) +
      ') msg: ' + this.inst.UTF8ToString(formatMessage(message, other))
    );

    this.inst._free(formatMessage);
  }

  initialize() {
    this.fmiEnterInit(this.fmiinst);
    this.fmiExitInit(this.fmiinst);
  }

  instantiate() {
    this.stepTime = 0;
    //console callback ptr, per emsripten create int ptr with signature viiiiii
    this.consoleLoggerPtr = this.inst.addFunction(this.consoleLogger.bind(this), 'viiiiii');
    this.callbackptr = this.fmiCreateCallback(this.consoleLoggerPtr);
    //create instance of model simulation
    this.fmiinst = this.fmiInstantiate(this.fminame, this.cosimulation, this.guid, '', this.callbackptr, 0, 0); //last 1 debug, 0 nodebug
    //setup experiment
    this.fmiSetup(this.fmiinst, 1, this.tolerance, this.starttime, 0);
    console.log('instantiated fmiinst', this.fmiinst);
    this.instantiated = true;
  }

  simulate() {}

  setReal(query, value, count) {
    return this.fmiSetReal(this.fmiinst, query.byteOffset, count, value.byteOffset);
  }

  setBoolean(query, value, count) {
    return this.fmiSetBoolean(this.fmiinst, query.byteOffset, count, value.byteOffset);
  }

  /**
   * Loads Reals from FMU
   */
  getReal(query, output, count) {
    return this.fmiGetReal(this.fmiinst, query.byteOffset, count, output.byteOffset);
  }

  /**
   * Loads Booleans from FMU
   */
  getBoolean(query, output, count) {
    return this.fmiGetBoolean(this.fmiinst, query.byteOffset, count, output.byteOffset);
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

  startstop() {
    if (this.animationstarted) {
      //stop animation
      this.animationstarted = false;
      cancelAnimationFrame(this.request);
    } else {
      this.animationstarted = true;
      //animate using requestAnimationFrame
      const performAnimation = () => {
        this.request = requestAnimationFrame(performAnimation);
        this.step();
      };
      requestAnimationFrame(performAnimation);
    }
  }

  step() {
    //primitive semaphore, only one instance can perform this call
    if (!this.doingstep) {
      this.doingstep = true;
      if (!this.instantiated) {
        this.instantiate();
        this.initialize();
      }
      //TODO now demo data, get real data from simulation
      //console.log('step()1 fmiinst', this.fmiinst);
      this.stepi++;
      const res = this.fmiDoStep(this.fmiinst, this.stepTime, this.stepSize, 1);
      //console.log('step() res:', res);
      if (res === 1 || res === 2) {
        this.fmiReset(this.fmiinst);
      }
      //console.log('step()2');

      this.mydata[0] = this.stepTime;
      this.mydata[1] = this.getSingleReal(this.references[0]);
      //console.log('step()3');

      //create data
      /*this.mydata[0]++;
      this.mydata[1] = Math.random();*/
      //create custom event
      let event = new CustomEvent('fmidata', {detail: this.mydata});
      //dispatch event - it should be listened by some other component
      document.getElementById(this.id).dispatchEvent(event);

      //console.log('step sending data via event',event);
      //prevent FMU(MeursHemodynamics_Model_vanMeursHemodynamicsModel:1:) msg: CVODE: CVode failed with NONE:
      //  Internal t = 19.4801 and h = 6.61693e-16 are such that t + h = t on the next step. The solver will continue anyway.
      // but bring instability
      //this.stepTime = parseFloat(parseFloat(this.stepTime + this.stepSize).toPrecision(12));

      //this solves stability of common simulation, but warning above produced
      this.stepTime = this.stepTime + this.stepSize;
      //same as parsefloat
      //this.stepTime=this.stepi * this.stepSize;
      if (this.measurefps) {
        if (this.fpstick === 0) {this.startfpstime = Date.now(); console.log('measurefps');}
        this.fpstick++;
        if (this.fpstick >= 200) {
          this.fps = 1000 * 200 / (Date.now() - this.startfpstime);
          this.fpstick = 0;
        }
      }
      this.doingstep = false;
    }
  }

  reset() {
    this.fmiReset(this.fmiinst);
    this.stepTime = 0;
  }

  /* routines to alloc buffer for getting/setting from fmi*/
  createBuffer(arr) {
    let size = arr.length * arr.BYTES_PER_ELEMENT;
    let ptr = this.inst._malloc(size);
    return { ptr, size };
  }

  createAndFillBuffer(arr) {
    const buffer = this.createBuffer(arr);
    this.fillBuffer(buffer, arr);
    return buffer;
  }

  freeBuffer(buffer) {
    if (buffer.ptr !== null) {
      this.inst._free(buffer.ptr);
    }
    buffer.ptr = null;
    buffer.size = null;
  }

  viewBuffer(buffer) {
    return new Uint8Array(this.inst.HEAPU8.buffer, buffer.ptr, buffer.size);
  }

  fillBuffer(buffer, arr) {
    const view = this.viewBuffer(buffer);
    view.set(new Uint8Array(arr.buffer));
    return buffer;
  }

  getSingleReal(reference) {
    const queryBuffer = this.createAndFillBuffer(new Int32Array([reference]));
    const query = this.viewBuffer(queryBuffer);
    const outputBuffer = this.createBuffer(new Float64Array(1));
    const output = this.viewBuffer(outputBuffer);

    this.getReal(query, output, 1);

    const real = new Float64Array(output.buffer, output.byteOffset, 1);

    this.freeBuffer(queryBuffer);
    this.freeBuffer(outputBuffer);
    return real[0];
  }
}
