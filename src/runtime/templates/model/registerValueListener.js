export default function registerValueListener(listener, name, attribute, immediate = false) {
  const reference = this.getReferenceFromName(name)
  if (reference === null) {
    console.log(`${this.config.identifier}: failed to register value listener ${name} from ${listener.name} to attribute ${attribute}`)
    return false
  }

  const index = this.outputValues.watch(reference)

  this.valueListeners.push({
    target: listener,
    attribute,
    indicies: null,
    index,
    immediate
  })

  console.log(`${this.config.identifier}: registered value listener ${name} (${reference}) from ${listener.name} as index ${index} to attribute ${attribute}`)
  return true
}
