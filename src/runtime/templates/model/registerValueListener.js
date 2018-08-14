export default function registerValueListener (listener, name) {
  let id = null
  if (this.config.parameters[name] !== undefined) {
    id = this.config.parameters[name].reference
  } else if (this.config.variables[name] !== undefined) {
    id = this.config.variables[name].reference
  }

  if (id === null) {
    return false
  }
  const index = this.outputValuesLength
  this.outputValuesIds[this.outputValuesLength++] = id

  this.valueListeners.push({
    target: listener,
    identifier: name,
    index: index
  })

  console.log(`Registered value listener ${listener.name} as index ${index}`)

  return true
}
