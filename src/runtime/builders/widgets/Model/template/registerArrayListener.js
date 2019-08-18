export default function registerArrayListener(listener, names, attribute, immediate = false) {
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

    const index = this.outputValues.watch(reference)

    lastname = name
    indicies.push(index)
  }

  this.valueListeners.push({
    target: listener,
    attribute,
    indicies,
    index: null,
    enabled: true,
    immediate
  })

  console.log(`${this.config.identifier}: registered array listener (..., ${lastname}) from ${listener.name} to attribute ${attribute}`)
  return true
}
