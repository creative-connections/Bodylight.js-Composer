export default function updateValueListeners () {
  this.valueListeners.forEach(listener => {
    listener.target.setValue(listener.attribute, this.outputValues[listener.index])
  })
}
