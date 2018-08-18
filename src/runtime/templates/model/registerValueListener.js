export default function registerValueListener (listener, name, attribute) {
  const reference = this.getReferenceFromName(name)

  if (reference === null) {
    return false
  }

  let index = this.outputValuesIds.indexOf(reference)

  if (index === -1) {
    index = this.outputValuesLength
    this.outputValuesIds[this.outputValuesLength++] = reference
  }

  this.valueListeners.push({
    target: listener,
    attribute,
    index
  })

  console.log(`${this.config.identifier}: registered value listener ${reference} from ${listener.name} as index ${index} to attribute ${attribute}`)

  return true
}
