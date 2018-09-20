export default function setValue (reference, value) {
  this.setSingleReal(reference, value)
  this.lastInputValues[reference] = value
}
