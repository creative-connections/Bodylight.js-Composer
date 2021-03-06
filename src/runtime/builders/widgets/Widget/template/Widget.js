export default class Widget {
  constructor(configuration, typeIdentifier) {
    Object.assign(this, configuration)
    this.typeIdentifier = typeIdentifier
    this.listeners = {}

    console.log(`Widget (${this.typeIdentifier}) instance ${this.name}`)

    this.component = this.locateComponent()

    this.perf = perf
    this.perf.register(this.id, this.name, typeIdentifier)

    this.valueProviders = []

    this.generateSetters()
    this.fillValueProviders()
    this.updateComponent()

    // EventTarget listeners
    this.loadEventListeners()

    this.constructed = true
  }

  addValueProvider(attribute, provider) {
    if (provider !== null) {
      this.valueProviders[attribute] = provider
    }
  }

  fillValueProviders() {
    Object.entries(this).forEach(([id, entry]) => {
      if (entry == null || typeof entry !== 'object') {
        return
      }
      if (typeof entry['provider'] !== 'undefined' && entry.provider !== null) {
        this.addValueProvider(id, entry.provider)
      }
    })
  }

  getValueProviders() {
    return this.valueProviders
  }

  setValueProvider(attribute, id, target) {
    target.registerValueListener(this, id, attribute)
    target.registerInitialValueListener(this, id, attribute)
  }

  setValueProviders(providers) {
    Object.entries(providers).forEach(([attribute, config]) => {
      this.setValueProvider(attribute, config.id, config.target)
    })
  }

  locateComponent() {
    const component = document.getElementById(this.id)
    if (component === null || component === undefined) {
      throw new ReferenceError(`Widget (${this.name}) of type (${this.typeIdentifier}) was not found.`)
    }
    return component
  }

  generateSetters() {
    console.warn(`generateSetters for ${this.name} is not overridden`)
  }

  updateComponent() {
    Object.entries(this.setters).forEach(([name, setter]) => {
      setter()
    })
  }

  setValue(attribute, value, time) {
    this[attribute].value = value
    this.setters[attribute]()
  }

  setArray(attribute, array, time) {
    console.warn(`setArray for ${this.name} is not overridden`)
  }

  setValues(attribute, values, time) {
    // set only last value
    this.setValue(attribute, values[values.length - 1], time[time.length - 1])
  }

  setArrays(attribute, arrays, time) {
    console.warn(`setArrays for ${this.name} is not overridden`)
  }

  loadEventListeners() {
    if (this.actions === undefined || this.actions === null) {
      return
    }
    Object.entries(this.actions).forEach(([key, action]) => {
      this.addEventListener(action.event, action.function.bind(this))
    })
  }

  addEventListener(type, callback) {
    if (!(type in this.listeners)) {
      this.listeners[type] = []
    }
    this.listeners[type].push(callback)
  }

  removeEventListener(type, callback) {
    if (!(type in this.listeners)) {
      return
    }
    let stack = this.listeners[type]
    for (let i = 0, l = stack.length; i < l; i++) {
      if (stack[i] === callback) {
        stack.splice(i, 1)
        return
      }
    }
  }

  dispatchEvent(event) {
    if (!(event.type in this.listeners)) {
      return true
    }
    let stack = this.listeners[event.type].slice()

    for (let i = 0, l = stack.length; i < l; i++) {
      stack[i].call(this, event)
    }
    return !event.defaultPrevented
  }
}
