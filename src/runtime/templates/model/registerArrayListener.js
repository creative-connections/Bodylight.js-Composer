export default function registerArrayListener (listener, names, attribute) {
  if (!Array.isArray(names)) {
    console.warn(`${this.config.identifier}: failed to register array listener '${names}' (not an array) from ${listener.name} to attribute ${attribute}`)
    return false
  }

  const indicies = []
  let lastname = null

  for (const name of names) {
    const reference = this.getReferenceFromName(name)
    if (reference === null) {
      console.warn(`${this.config.identifier}: failed to register array listener (${name} not found) from ${listener.name} to attribute ${attribute}`)
      return false
    }

    let index = this.outputValuesIds.indexOf(reference)
    if (index === -1) {
      index = this.outputValuesLength
      this.outputValuesIds[this.outputValuesLength++] = reference
    }

    lastname = name
    indicies.push(index)
  }

  this.valueListeners.push({
    target: listener,
    attribute,
    indicies
  })

  console.log(`${this.config.identifier}: registered array listener (..., ${lastname}) from ${listener.name} to attribute ${attribute}`)
  return true
}
