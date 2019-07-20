export default function enableListener(listener, attribute) {
  if (listener == null || attribute == null) {
    return false
  }
  
  const getValueListener = (listener, attribute) => {
    let found = null
    this.valueListeners.forEach(valueListener => {
      if (valueListener.target === listener && valueListener.attribute === attribute) {
        found = valueListener
      }
    })
    return found
  }

  const valueListener = getValueListener(listener, attribute)
  if (valueListener == null) {
    console.log(`${this.config.identifier}: could not enable listener ${attribute} from ${listener.name}`)
    return false
  } else {
    valueListener.enabled = true
    console.log(`${this.config.identifier}: enabled listener ${attribute} from ${listener.name}`)
    return true
  }
}
