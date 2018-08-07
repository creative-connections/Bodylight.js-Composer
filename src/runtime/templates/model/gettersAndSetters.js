export default function gettersAndSetters () {
/**
 * Converts TypedArray to Uint8Array
 */
  this.heapArray = function (arr) {
    let numBytes = arr.length * arr.BYTES_PER_ELEMENT
    let ptr = this._malloc(numBytes)
    // heapBytes.byteOffset is the ptr
    let heapBytes = new Uint8Array(this.HEAPU8.buffer, ptr, numBytes)
    heapBytes.set(new Uint8Array(arr.buffer))
    return heapBytes
  }

  /**
 * Sets Reals to FMU
 */
  this.setReal = function (query, value, count) {
    return this.fmi2SetReal(this.inst, query.byteOffset, count, value.byteOffset)
  }

  /**
 * Sets Booleans to FMU
 */
  this.setBoolean = function (query, value, count) {
    return this.fmi2SetBoolean(this.inst, query.byteOffset, count, value.byteOffset)
  }

  /**
 * Loads Reals from FMU
 */
  this.getReal = function (query, output, count) {
    return this.fmi2GetReal(this.inst, query.byteOffset, count, output.byteOffset)
  }

  /**
 * Loads Booleans from FMU
 */
  this.getBoolean = function (query, output, count) {
    return this.fmi2GetBoolean(this.inst, query.byteOffset, count, output.byteOffset)
  }

  /**
  * Sets every value waiting in the setQueues
  */
  this.flushSetQueues = function () {
    this.flushRealQueue()
    this.flushBooleanQueue()
  }

  this.setRealQueue = false
  this.setBooleanQueue = false

  this.flushBooleanQueue = function () {
    if (this.setBooleanQueue) {
      let references = this.heapArray(new Int32Array(this.setBooleanQueue.references))
      let values = this.heapArray(new Int32Array(this.setBooleanQueue.values))

      this.setBoolean(references, values, this.setBooleanQueue.references.length)
      this._free(references.byteOffset)
      this._free(values.byteOffset)

      this.setBooleanQueue = false
    }
  }

  this.flushRealQueue = function () {
    if (this.setRealQueue) {
      let references = this.heapArray(new Int32Array(this.setRealQueue.references))
      let values = this.heapArray(new Float64Array(this.setRealQueue.values))

      this.setReal(references, values, this.setRealQueue.references.length)
      this._free(references.byteOffset)
      this._free(values.byteOffset)

      this.setRealQueue = false
    }
  }

  /**
 * Adds a real value to setRealQueue
 */
  this.setSingleReal = function (reference, value) {
    if (!this.setRealQueue) {
      this.setRealQueue = {
        references: [],
        values: []
      }
    }
    this.setRealQueue.references.push(reference)
    this.setRealQueue.values.push(value)
  }

  /**
 * Loads a single real value based on reference, this is a shorthand function.
 * It is recommended to use Module.getReal with reusable mallocs.
 */
  this.getSingleReal = function (reference) {
    let query = this.heapArray(new Int32Array([reference]))
    let output = this.heapArray(new Float64Array(1))
    this.getReal(query, output, 1)
    let num = new Float64Array(output.buffer, output.byteOffset, 1)
    this._free(query.byteOffset)
    this._free(output.byteOffset)
    return num[0]
  }

  /**
 */
  this.setSingleBoolean = function (reference, value) {
    if (!this.setBooleanQueue) {
      this.setBooleanQueue = {
        references: [],
        values: []
      }
    }
    this.setBooleanQueue.references.push(reference)
    this.setBooleanQueue.values.push(value)
  }

  /**
 * Loads a single boolean value based on reference, this is a shorthand function.
 * It is recommended to use Module.getBoolean with reusable mallocs.
 */
  this.getSingleBoolean = function (reference) {
    let query = this.heapArray(new Int32Array([reference]))
    let output = this.heapArray(new Int32Array(1))
    this.getBoolean(query, output, 1)
    let num = new Int32Array(output.buffer, output.byteOffset, 1)
    this._free(query.byteOffset)
    this._free(output.byteOffset)
    return num[0]
  }
}
