export default function registerValueSetter (name) {
  const reference = this.getReferenceFromName(name)

  if (reference === null) {
    return null
  }
  console.log(`${this.config.identifier}: registered value setter for ${name}`)
  return reference
}
