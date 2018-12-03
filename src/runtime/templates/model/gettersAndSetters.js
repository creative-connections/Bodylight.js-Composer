export default function gettersAndSetters() {
  this.createBuffer = function (arr) {
    let size = arr.length * arr.BYTES_PER_ELEMENT
    let ptr = this._malloc(size)
    return { ptr, size }
  }

  this.createAndFillBuffer = function (arr) {
    const buffer = this.createBuffer(arr)
    this.fillBuffer(buffer, arr)
    return buffer
  }

  this.freeBuffer = function (buffer) {
    if (buffer.ptr !== null) {
      this._free(buffer.ptr)
    }
    buffer.ptr = null
    buffer.size = null
  }

  this.viewBuffer = function (buffer) {
    return new Uint8Array(this.HEAPU8.buffer, buffer.ptr, buffer.size)
  }

  this.fillBuffer = function (buffer, arr) {
    const view = this.viewBuffer(buffer)
    view.set(new Uint8Array(arr.buffer))
    return buffer
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
      const referenceBuffer = this.createAndFillBuffer(new Int32Array(this.setBooleanQueue.references))
      const references = this.viewBuffer(referenceBuffer)
      const valueBuffer = this.createAndFillBuffer(new Int32Array(this.setBooleanQueue.values))
      const values = this.viewBuffer(valueBuffer)

      this.setBoolean(references, values, this.setBooleanQueue.references.length)
      this.freeBuffer(referenceBuffer)
      this.freeBuffer(valueBuffer)

      this.setBooleanQueue = false
    }
  }

  this.flushRealQueue = function () {
    if (this.setRealQueue) {
      const referenceBuffer = this.createAndFillBuffer(new Int32Array(this.setRealQueue.references))
      const references = this.viewBuffer(referenceBuffer)
      const valueBuffer = this.createAndFillBuffer(new Float64Array(this.setRealQueue.values))
      const values = this.viewBuffer(valueBuffer)

      this.setReal(references, values, this.setRealQueue.references.length)
      this.freeBuffer(referenceBuffer)
      this.freeBuffer(valueBuffer)

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
    const queryBuffer = this.createAndFillBuffer(new Int32Array([reference]))
    const query = this.viewBuffer(queryBuffer)
    const outputBuffer = this.createBuffer(new Float64Array(1))
    const output = this.viewBuffer(outputBuffer)

    this.getReal(query, output, 1)

    const real = new Float64Array(output.buffer, output.byteOffset, 1)

    this.freeBuffer(queryBuffer)
    this.freeBuffer(outputBuffer)
    return real[0]
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
    const queryBuffer = this.createAndFillBuffer(new Int32Array([reference]))
    const query = this.viewBuffer(queryBuffer)
    const outputBuffer = this.createBuffer(new Int32Array(1))
    const output = this.viewBuffer(outputBuffer)
    this.getBoolean(query, output, 1)
    const bool = new Int32Array(output.buffer, output.byteOffset, 1)
    this.freeBuffer(queryBuffer)
    this.freeBuffer(outputBuffer)
    return bool[0]
  }
}