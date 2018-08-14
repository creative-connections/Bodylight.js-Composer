export default function registerInitialValueListener (listener, name) {
  let id = null
  if (this.config.parameters[name] !== undefined) {
    id = this.config.parameters[name].reference
  } else if (this.config.variables[name] !== undefined) {
    id = this.config.variables[name].reference
  }

  if (id === null) {
    return false
  }

  this.initialValueListeners.push({
    target: listener,
    identifier: name,
    reference: id
  })

  console.log(`${this.config.identifier}: registered initial value listener ${listener.name}`)

  return true
}
