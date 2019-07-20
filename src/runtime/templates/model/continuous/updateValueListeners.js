export default function updateValueListeners(immediate) {
  this.valueListeners.forEach(listener => {
    if (listener.immediate !== immediate) {
      return
    }
    if (listener.enabled === false) {
      return
    }
    if (listener.index !== null) {
      listener.target.setValue(
        listener.attribute,
        this.outputValues.value(listener.index),
        this.currentStep
      )
    } else if (listener.indicies !== null) {
      listener.target.setArray(
        listener.attribute,
        listener.indicies.map(index => this.outputValues.value(index)),
        this.currentStep
      )
    }
  })
}
