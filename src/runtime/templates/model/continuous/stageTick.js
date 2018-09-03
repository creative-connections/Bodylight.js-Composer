export default function stageTick () {
  if (this.updated === true) {
    this.updateOutputValues()
    this.updateValueListeners()
    this.updated = false
  }
}
