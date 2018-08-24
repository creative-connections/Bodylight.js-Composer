export default function updateInitialValueListeners () {
  this.initialValueListeners.forEach(listener => {
    listener.target.setValue(listener.attribute, this.getSingleReal(listener.reference))
  })
}
