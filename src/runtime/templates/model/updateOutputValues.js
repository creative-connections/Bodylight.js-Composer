export default function updateOutputValues () {
  this.fmi2GetReal(
    this.inst,
    this.outputValuesIds.byteOffset,
    this.outputValuesLength,
    this.outputValuesBuffer.byteOffset
  )
  this.outputValues = new Float64Array(
    this.outputValuesBuffer.buffer,
    this.outputValuesBuffer.byteOffset,
    this.outputValuesLength
  )
}
