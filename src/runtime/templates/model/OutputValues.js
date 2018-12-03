export default class OutputValues {
  constructor(model) {
    this.model = model
    this.references = []

    this.valueBuffer = null
    this.referenceBuffer = null
    this.values = null

    this.alloc()
  }

  watch(reference) {
    let index = this.references.indexOf(reference)
    if (index === -1) {
      this.references.push(reference)
      index = this.references.indexOf(reference)
      this.realloc()
    }
    return index
  }

  length() {
    return this.references.length
  }

  alloc() {
    const model = this.model
    // create empty buffer for output values
    this.valueBuffer = model.createBuffer(new Float64Array(this.length()))
    // create buffer with references
    this.referenceBuffer = model.createAndFillBuffer(new Int32Array(this.references))
  }

  realloc() {
    this.model.freeBuffer(this.valueBuffer)
    this.model.freeBuffer(this.referenceBuffer)
    this.values = null
    this.alloc()
  }

  update() {
    const model = this.model
    const references = model.viewBuffer(this.referenceBuffer)
    const values = model.viewBuffer(this.valueBuffer)
    model.fmi2GetReal(model.inst, references.byteOffset, this.length(), values.byteOffset)
    this.values = new Float64Array(values.buffer, values.byteOffset, this.length())
  }

  value(index) {
    if (this.values == null) {
      console.warn(`OutputValues can not provide ${index} right now`)
      return null
    }
    return this.values[index]
  }
}