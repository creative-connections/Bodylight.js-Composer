export default function updateValueByName(name, modifier) {
  if (modifier == null) {
    console.warn(`Can not update ${name} modifier is null`)
    return
  }

  let value = this.getValueByName(name)
  if (value == null) { return }

  typeof modifier === 'function' ? value = modifier(value) : value = Number(modifier)

  if (isNaN(value)) {
    console.warn(`Can not update ${name}, value is ${value}`)
    return
  }

  const reference = this.getReferenceFromName(name)
  this.setValue(reference, value)
}