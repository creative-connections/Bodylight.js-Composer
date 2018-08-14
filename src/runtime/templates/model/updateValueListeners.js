export default function updateValueListeners () {
  this.valueListeners.forEach(listener => {
    listener.target.setValue(listener.identifier, this.outputValues[listener.index])
  })
}
