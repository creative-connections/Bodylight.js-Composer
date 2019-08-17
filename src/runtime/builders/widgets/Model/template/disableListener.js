export default function disableListener(listener, attribute) {
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
    console.log(`${this.config.identifier}: could not disable listener ${attribute} from ${listener.name}`)
    return false
  } else {
    valueListener.enabled = false
    console.log(`${this.config.identifier}: disabled listener ${attribute} from ${listener.name}`)
    return true
  }
}
