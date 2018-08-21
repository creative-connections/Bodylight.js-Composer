export default class Widget {
  constructor (configuration, typeIdentifier) {
    Object.assign(this, configuration)
    this.typeIdentifier = typeIdentifier

    this.component = this.locateComponent()

    console.log(`Widget (${this.typeIdentifier}) instance ${name}`)

    this.valueProviders = []

    this.generateSetters()
    this.fillValueProviders()
    this.updateComponent()

    // EventTarget listeners
    this.listeners = {}
    this.loadEventListeners()
  }

  addValueProvider (attribute, provider) {
    if (provider !== null) {
      this.valueProviders[attribute] = provider
    }
  }

  fillValueProviders () {
    this.attributes.forEach(attribute => {
      if (this[attribute].provider !== null) {
        this.addValueProvider(attribute, this[attribute].provider)
      }
    })
  }

  getValueProviders () {
    return this.valueProviders
  }

  setValueProvider (attribute, name, target) {
    target.registerValueListener(this, name, attribute)
    target.registerInitialValueListener(this, name, attribute)
  }

  setValueProviders (providers) {
    Object.entries(providers).forEach(([attribute, config]) => {
      this.setValueProvider(attribute, config.name, config.target)
    })
  }

  locateComponent () {
    const componentName = `${this.typeIdentifier}-${this.name}`
    const component = document.getElementsByName(componentName)[0]
    if (component === undefined) {
      throw new ReferenceError(`Widget (${this.name}) of type (${this.typeIdentifier}) with name="${componentName}" not found.`)
    }
    return component
  }

  generateSetters () {
    console.warn(`generateSetters for ${this.name} is not overridden`)
  }

  updateComponent () {
    Object.entries(this.setters).forEach(([name, setter]) => {
      setter()
    })
  }

  setValue (attribute, value) {
    this[attribute].value = value
    this.setters[attribute](value)
  }

  loadEventListeners () {
    if (this.actions === undefined || this.actions === null) {
      return
    }
    Object.entries(this.actions).forEach(([key, action]) => {
      this.addEventListener(action.event, action.function)
    })
  }

  addEventListener (type, callback) {
    if (!(type in this.listeners)) {
      this.listeners[type] = []
    }
    this.listeners[type].push(callback)
  }

  removeEventListener (type, callback) {
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

  dispatchEvent (event) {
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
