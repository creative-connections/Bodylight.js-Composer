export default function stageTick() {
  if (this.updated === true) {
    this.outputValues.update()
    this.updateValueListeners()
    this.updated = false
  }
}