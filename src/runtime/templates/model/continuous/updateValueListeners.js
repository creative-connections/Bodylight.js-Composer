export default function updateValueListeners () {
  this.valueListeners.forEach(listener => {
    if (listener.index !== null) {
      listener.target.setValue(
        listener.attribute,
        this.outputValues[listener.index],
        this.currentStep
      )
    } else if (listener.indicies !== null) {
      listener.target.setArray(
        listener.attribute,
        listener.indicies.map(index => this.outputValues[index]),
        this.currentStep
      )
    }
  })
}
