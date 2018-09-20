export default function setValue (reference, value) {
  this.reset(false)
  this.setSingleReal(reference, value)
  this.play()
}
