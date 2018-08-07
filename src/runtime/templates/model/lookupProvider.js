export default function lookupProvider (type, id) {
  // Parameter and variable reading is identical
  if (type === this.ValueProviderType.MODEL_PARAMETER ||
      type === this.ValueProviderType.MODEL_VARIABLE) {
    // register parameter/variable id to be retrieved from FMU
    const index = this.registerGetId(id)

    // return function pointing to correct id
    const output = Function('return this.outputValues[' + index + ']')

    return output.bind(this)
  }
}
