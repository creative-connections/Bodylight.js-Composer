export default function getValueByName(name) {
  const reference = this.getReferenceFromName(name)

  if (reference == null) {
    console.warn(`Can not read ${name} - name not found.`)
    return null
  }

  return this.getSingleReal(reference)
}