export default function registerValueSetter (name) {
  let id = null
  if (this.config.parameters[name] !== undefined) {
    id = this.config.parameters[name].reference
  } else if (this.config.variables[name] !== undefined) {
    id = this.config.variables[name].reference
  }

  if (id === null) {
    return null
  }

  console.log(`${this.config.identifier}: registered value setter for ${name}`)

  return id
}
