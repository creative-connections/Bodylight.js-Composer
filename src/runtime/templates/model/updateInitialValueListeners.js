export default function updateValueListeners () {
  this.initialValueListeners.forEach(listener => {
    listener.target.setValue(listener.identifier, this.getSingleReal(listener.reference))
  })
}
