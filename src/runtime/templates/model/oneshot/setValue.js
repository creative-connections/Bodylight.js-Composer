export default function setValue (reference, value) {
  this.lastInputValues[reference] = value
  this.reset(false)
  this.play()
}
