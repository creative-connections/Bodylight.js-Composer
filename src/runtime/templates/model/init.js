export default function init () {
  // transform getIds to Int32Array
  this.outputValuesIds = this.heapArray(new Int32Array(this.outputValuesIds))
  // create outputValues array for getting values from FMU
  this.outputValuesBuffer = this.heapArray(new Float64Array(this.outputValuesLength))
  this.outputValues = Array(this.outputValuesLength).fill(0)

  this.perf.register(this.config.id, this.config.name, this.config.type)

  this.instantiate()
  this.setup()
  this.play()
}
