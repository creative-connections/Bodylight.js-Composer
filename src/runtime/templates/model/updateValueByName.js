export default function updateValueByName(name, modifier) {
  if (modifier == null) {
    console.warn(`Can not update ${name} modifier is null`)
    return
  }

  const reference = this.getReferenceFromName(name)

  if (reference == null) {
    console.warn(`Can not update ${name} - name not found.`)
    return
  }

  let value = this.getSingleReal(reference)
  typeof modifier === 'function' ? value = modifier(value) : value = Number(modifier)

  if (isNaN(value)) {
    console.warn(`Can not update ${name}, value is ${value}`)
    return
  }

  this.setValue(reference, value)
}