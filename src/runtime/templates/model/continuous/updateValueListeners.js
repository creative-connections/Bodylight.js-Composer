export default function updateValueListeners () {
  this.valueListeners.forEach(listener => {
    if (listener.index) {
      listener.target.setValue(
        listener.attribute,
        this.outputValues[listener.index],
        this.currentStep
      )
    } else if (listener.indicies) {
      listener.target.setArray(
        listener.attribute,
        listener.indicies.map(index => this.outputValues[index]),
        this.currentStep
      )
    }
  })
}
