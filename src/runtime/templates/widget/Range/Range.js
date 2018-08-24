class Widget { }

export default class Range extends Widget {
  constructor (configuration) {
    super(configuration, 'range')

    this.component.step = (this.component.max - this.component.min) / 1000

    // register change handler
    this.handleOnChange = this.handleOnChange.bind(this)
    this.component.addEventListener('input', this.handleOnChange)

    this.addValueProvider('target', this.target.provider)
  }

  handleOnChange () {
    let value = this.component.value
    if (this.reversed.value) {
      value = this.max - value
    }
    if (this.target.function !== null) {
      value = this.target.function(value)
    }
    this.target.provider.setValue(this.target.reference, value)
  }

  generateSetters () {
    this.setters = {
      target: () => {
        if (this.target.function === null) {
          this.component.value = this.target.value
          return
        }
        this.component.value = this.target.function(this.target.value)
      },
      enabled: () => {
        if (this.enabled.function === null) {
          this.component.disabled = !this.enabled.value
          return
        }
        this.component.disabled = !this.enabled.function(this.enabled.value)
      },
      min: () => {
        if (this.min.function === null) {
          this.component.min = this.min.value
          return
        }
        this.component.min = this.min.function(this.min.value)
      },
      max: () => {
        if (this.max.function === null) {
          this.component.max = this.max.value
          return
        }
        this.component.max = this.max.function(this.max.value)
      },
      reversed: () => {
        if (this.reversed.function !== null) {
          this.reversed.value = this.reversed.function(this.reversed.value)
        }
      }
    }
  }

  setValueProvider (attribute, id, target) {
    if (attribute === 'target') {
      target.registerInitialValueListener(this, id, attribute)
      this.target.reference = target.registerValueSetter(id)
      this.target.provider = target
      return
    }
    super.setValueProvider(attribute, id, target)
  }
}
