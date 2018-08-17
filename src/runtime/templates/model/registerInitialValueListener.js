export default function registerInitialValueListener (listener, name, attribute) {
  const reference = this.getReferenceFromName(name)

  if (reference === null) {
    return false
  }

  this.initialValueListeners.push({
    target: listener,
    attribute,
    reference
  })

  console.log(`${this.config.identifier}: registered initial value listener ${name} (${reference})`)

  return true
}
