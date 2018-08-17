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
}
