export default function registerValueSetter (setter, name, attribute) {
  const reference = this.getReferenceFromName(name)
  if (reference === null) {
    return null
  }

  this.valueSetters.push({
    setter,
    reference,
    attribute
  })

  console.log(`${this.config.identifier}: registered value setter for ${name} (${reference})`)
  return reference
}
