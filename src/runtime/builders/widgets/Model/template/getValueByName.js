export default function getValueByName(name) {
  if (this.modelIsSetup === false) {
    return null
  }
  const reference = this.getReferenceFromName(name)

  if (reference == null) {
    console.warn(`Can not read ${name} - name not found.`)
    return null
  }

  return this.getSingleReal(reference)
}
