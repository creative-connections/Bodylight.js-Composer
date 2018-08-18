export default function updateValueListeners () {
  this.initialValueListeners.forEach(listener => {
    listener.target.setValue(listener.attribute, this.getSingleReal(listener.reference))
  })
}
