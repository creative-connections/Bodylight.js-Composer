export default function getReferenceFromName (name) {
  let reference = null
  if (this.config.parameters[name] !== undefined) {
    reference = this.config.parameters[name].reference
  } else if (this.config.variables[name] !== undefined) {
    reference = this.config.variables[name].reference
  }
  return reference
}
