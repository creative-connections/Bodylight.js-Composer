export default function setInitialValueByName (name, value) {
  const reference = this.getReferenceFromName(name)
  if (reference === null) {
    console.warn(`setInitialValueByName could not find ${name}`)
    return
  }
  this.initialValues[reference] = value
}
