export default class Range {
  constructor (name, configuration) {
    this.name = name
    Object.assign(this, configuration)

    // find component in the document
    const componentName = `range-${name}`
    const component = document.getElementsByName(componentName)[0]
    if (component === undefined) {
      throw new ReferenceError(`Range (${name}) with name="${componentName}" not found.`)
    }

    component.min = this.min
    component.max = this.max
    component.step = (this.max - this.min) / 1000

    // register change handler
    this.handleOnChange = this.handleOnChange.bind(this)
    component.addEventListener('input', this.handleOnChange)

    this.component = component
  }

  handleOnChange (e, v) {
    let value
    if (this.reverse) {
      value = this.transform(this.max - value)
    } else {
      value = this.transform(this.component.value)
    }
    this.valueProvider.setValue(this.valueIdentifier, value)
  }

  getValueProvider () {
    return this.valueProvider
  }

  setValueProvider (provider, id) {
    this.valueIdentifier = provider.registerValueSetter(id)
    if (this.loadInitialValue === true) {
      provider.registerInitialValueListener(this, id)
    }

    this.valueProvider = provider
  }

  setValue (identifier, value) {
    this.component.value = this.transform(value)
  }
}
